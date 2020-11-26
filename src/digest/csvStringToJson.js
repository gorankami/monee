module.exports = function csvStringToJson(csv) {
  return csv
    .replace(/\r/g, '')
    .split('\n')
    .filter((line, index) => line.length && index)
    .map((line) => {
      let hasStartedParenthesis = false
      let lineArray = []
      let cell = ''

      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        if (line[charIndex] === ',' && !hasStartedParenthesis) {
          lineArray.push(cell)
          cell = ''
          continue
        }
        if (line[charIndex] === '"') {
          if (!hasStartedParenthesis) {
            hasStartedParenthesis = true
            continue
          }
          lineArray.push(cell)
          cell = ''
          hasStartedParenthesis = false
          if (line[charIndex + 1] === ',') charIndex++
          continue
        }
        if (line[charIndex] === '"' && !hasStartedParenthesis) {
          hasStartedParenthesis = true
          continue
        }

        cell += line[charIndex]
      }
      lineArray.push(cell)
      return {
        target: lineArray[0],
        targetAccountNumber: lineArray[1],
        amount: Number(lineArray[2]),
        currency: lineArray[3],
        purpose: lineArray[4],
        purposeCode: lineArray[5],
        date: lineArray[6],
      }
    })
}
