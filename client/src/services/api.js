
import socketIO from 'socket.io-client'
const socket = socketIO('http://localhost:3000')


const service = {
  search: query => {
    socket.emit('search', query)
  }

  // search: (query, callback) => {
  //   fetch(`/api/twt/qry/${query}`)
  //   .then(resp => resp.json()
  //   .then(data => callback(data)))
  // }
}

export const createService = cb => {
  socket.on('tweets_update', results => cb(results))

  return service
}
