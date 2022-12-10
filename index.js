const fs = require('fs')
const readline = require('readline')

async function processLineByLine() {
  const fileStream = fs.createReadStream('./countrycapitals.csv')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let list = []
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.

    if (line.indexOf('"') === -1) {
      let stringParts = line.split(',')
      //console.log(stringParts[0], stringParts[1])
      let country = stringParts[0]
      let capital = ''
      for (let i = 1; i < stringParts.length; i++) {
        capital += stringParts[i]
      }
      let item = { country, capital }
      console.log(JSON.stringify(item, 2, null))
      list.push(item)
    } else {
      console.log(line)
    }
  }

  console.log(list)
}

processLineByLine()
