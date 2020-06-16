const palindrome = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0 // If array.length === 0, it means that it is an empty array, or NaN if the array was divided by 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

module.exports = {
  palindrome,
  average,
}