const fs = require('fs')
const path = require('path')
const copydir = require('copy-dir')
const inputDir = path.join(__dirname, 'presentations')
const outputDir = path.join(__dirname, 'src/assets/presentations')
const json = {}

/**
 * Split markdown files by headline 1, 2 and 3
 *
 * @param {*} readPath
 * @param {*} writePath
 */
const splitter = function (readPath, writePath) {
  let array = []
  let _title = ''
  let title = ''
  let file = ''
  let first = true
  let counter = 1
  let meta = []
  let chapter = ''
  let isCodeBlock = false

  try {
    array = fs.readFileSync(readPath).toString().split('\n')
  } catch (err) {
    throw err
  }

  for (let i = 0; i < array.length; i++) {
    if (first) {
      file = ''
    }

    if (array[i].indexOf('```') === 0) {
      isCodeBlock = !isCodeBlock
    }

    // split files by headline 1, 2 and 3
    if ((array[i].indexOf('# ') === 0 ||
      array[i].indexOf('## ') === 0 ||
      array[i].indexOf('### ') === 0) && !isCodeBlock) {
      if (!first) {
        fs.writeFile(title, file, function (err) {
          if (err) throw err
        })
        counter += 1
        file = ''
      }

      let fileName = array[i].replace(/#/g, '').trim()
      if (fileName.length <= 0) {
        fileName = '<empty>'
      }

      _title = counter + '-' + fileName.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-zA-Z0-9\s-_äöüÄÖÜß]/g, '')
        .replace(/-{2,}/g, '-')
      title = writePath + _title + '.md'
      file += array[i]
      first = false

      chapter = array[i].indexOf('## ') === 0 ? fileName : chapter

      meta.push({
        id: _title,
        title: fileName,
        isFirst: array[i].indexOf('# ') === 0,
        chapter: array[i].indexOf('### ') === 0 ? chapter : ''
      })
    } else {
      let newline = '\n' + array[i]
      file += newline
    }
  }

  // handle last file
  fs.writeFile(title, file, function (err) {
    if (err) throw err
  })

  return meta
}

const isDirectory = fileName => {
  return fs.lstatSync(fileName).isDirectory()
}

const presentations = fs.readdirSync(inputDir).map(fileName => {
  return path.join(inputDir, fileName)
}).filter(isDirectory)

if (!presentations.length) {
  console.error('No presentations found in', inputDir)
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

presentations.forEach((presentation) => {
  let folder = path.basename(presentation)

  if (!fs.existsSync(`${outputDir}/${folder}/`)) {
    fs.mkdirSync(`${outputDir}/${folder}/`)
  }

  let files = fs.readdirSync(presentation).filter(function (file) {
    return path.extname(file).toLowerCase() === '.md' &&
      path.basename(file, '.md').toLowerCase() !== 'readme'
  })

  files.forEach((file) => {
    json[folder] = splitter(`${inputDir}/${folder}/${file}`, `${outputDir}/${folder}/`)
  })

  if (fs.existsSync(`${inputDir}/${folder}/assets/`)) {
    copydir.sync(`${inputDir}/${folder}/assets/`, `${outputDir}/${folder}/assets`)
  }
})

fs.writeFileSync(`${outputDir}/slides.json`, JSON.stringify(json))
