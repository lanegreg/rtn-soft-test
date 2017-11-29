
const shuffle = arr => {
  const randomIndexes = [],
        arrLength = arr.length

  while(randomIndexes.length < arrLength) {
    let idx = Math.floor((Math.random() * arrLength) + 1)
  
    if(!randomIndexes.find(item => item === idx)) {
      randomIndexes.push(idx)
    }
  }

  return randomIndexes.map(idx => arr[idx-1])
}


shuffle(['one','two','three','four','five']) // => ["two", "three", "one", "five", "four"]