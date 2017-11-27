
/** Add your redis cache name and access key.
  redis.createClient(6380,
    '<name>.redis.cache.windows.net', {
      auth_pass: '<key>', 
      tls: {
        servername: '<name>.redis.cache.windows.net'
      }
    }
  )
 */

const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      less = require('less-middleware'),
      crypto = require('crypto'),
      fetch = require('node-fetch'),
			parseString = require('xml2js').parseString,
      bluebird = require('bluebird'),
      redis = require('redis'),
      redcli = redis.createClient({ port: 6379, host: '127.0.0.1' }),
      timers = require('timers'),
      { setInterval, clearInterval } = timers

bluebird.promisifyAll(redis.RedisClient.prototype)

const REFETCH_INTERVAL_IN_SECS = 20



redcli.on('error', error => {
  console.log(`Error: ${error}`)
})

//- setup socket.io and interval querying
io.on('connection', socket => {
	console.log(`connected with socket id: ${socket.id}`)
  
  const tids = []
  
	socket.on('search', query => {
    console.log(`searched for '${query}', with socket id: ${socket.id}`)

    const sendTweetsUpdate = (query, socketId) => {
      fetchTweets(query, tweets => {
        const hashedGuids = getHashedGuids(tweets),
              hashedGuidsKey = `${socketId}:${query}`
  
        redcli.getAsync(hashedGuidsKey)
        .then(hashedGuidsInCache => {
          redcli.setAsync(hashedGuidsKey, hashedGuids, 'EX', (REFETCH_INTERVAL_IN_SECS + 10))

          //- if no change per socket_id/query combination, send nothing
          if(hashedGuidsInCache && hashedGuidsInCache === hashedGuids) return

          socket.emit('tweets_update', { tweets, fetchedOn: Date.now() })
        })
      })
    }


    //- since this is a client-side call, clear previous interval if exists
    const idx = tids.findIndex(item => item.socketId === socket.id)
    clearInterval(tids[idx])
    tids.splice(idx,1) //- remove object from array

    sendTweetsUpdate(query, socket.id)

    //- set interval for changed tweets update
    let tid = setInterval(() => {
      sendTweetsUpdate(query, socket.id)
    }, (REFETCH_INTERVAL_IN_SECS * 1000))

    //- save timer_id so that we can kill the setInterval query when a client-side search is reissued
    tids.push({ socketId: socket.id, tid })
  })
})


// less will automatically compile matching requests for .css files
app.use(less('client/public'))
// public assets are served before any dynamic requests
app.use(express.static('client/public'))


//- this route handles api call for querying tweets (the original way before socket.io)
app.get('/api/twt/qry/:q', (req, res) => {
	fetchTweets(req.params.q, cards => res.send(cards))
})


//- express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}


//- kick-off the server
app.set('port', process.env.PORT || 3001)
http.listen(app.get('port'), () => {
	console.log(`\nServer ready on port %d\n${app.get('port')}`)
})



/**
 *  - helper functions -
 */
const fetchTweets = (query, cb) => {
	url = `https://queryfeed.net/twitter?q=%23${query}&title-type=user-name-both&attach=on`
	console.log(url)

  fetch(url, res => res.text())
	.then(json => parseString(json.body._readableState.buffer.head.data,
		(err, json) => { 
			//console.log(json.rss.channel[0])
			let tweets = [],
					item = json.rss.channel[0].item

			if(item) {
				tweets = item.map(item => {
					let guid = item.guid[0],
							id = guid.substr(guid.lastIndexOf('/') - (guid.length - 1))

					let type = item.enclosure && item.enclosure[0].$.type,
							media = type === 'application/octet-stream' ? item.enclosure[0].$.url : undefined

					return {
						id,
						author: item.title[0],
						description: item.description[0],
						date: item.pubDate,
						media
					}
				})
			}

			cb(tweets)
		})
	)
}


const getHashedGuids = tweets => {
  return crypto.createHash('sha256')
        .update(tweets.map(item => item.id).join(''))
        .digest('hex')
}