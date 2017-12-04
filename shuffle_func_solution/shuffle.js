
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