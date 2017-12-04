## Feed Me Tweets

The primary files to take notice of are:
* **_server.js_**
* **_./client/src/App.js_**
* **_./client/src/Card.js_**
* **_./client/src/services/api.js_**

> I chose to use redis to store server-side state. I am using socket.io to push new updates to the frontend if there is a change detected in tweets, per query/socket_id. Change is detected by concatenating the tweet guids and then hashing them. The old hash and the new hash are then compared.

.
## StudentsDB

The script file can also be found in the **_./db_sripts/StudentsDB__scripts.sql_** file.

.
## Shuffle Interview Question

The shuffle function can be found in the **_./shuffle_func_solution/shuffle.js_**.

    const shuffle = arr => {
      const randomIndexes = []

      while(randomIndexes.length < arr.length) {
        let idx = Math.floor((Math.random() * arr.length) + 1)
      
        if(!randomIndexes.find(item => item === idx)) {
          randomIndexes.push(idx)
        }
      }

      return randomIndexes.map(idx => arr[idx-1])
    }


    shuffle(['one','two','three','four','five']) // => ["two", "three", "one", "five", "four"]
