/* eslint-disable */
'use strict'

const fs = require('fs')

/* This method can be used to get a list of files in a given directory and its subdirectory.
 * @param  {string}  dir     The directory whose file path need to be retrieved.
 * @return {Array}           An array of files in a given directory and subdirectory
 */
const getFiles = (exports.getFiles = function(dir, files_) {
  files_ = files_ || []
  let files = fs.readdirSync(dir)
  for (let i in files) {
    let name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
})

/* This method can be used to read a file asynchronously.
 * @param  {string}  filepath  The file path of the file to be read.
 * @return {Promise}           A promise with the data read from the file.
 */
const readFile = (exports.readFile = function(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
})

/* This method can be used to read a file synchronously.
 * @param  {string}  filepath  The file path of the file to be read.
 * @return {String}            A String representation of the contents read from the file.
 */
const readFileSynchronously = (exports.readFileSynchronously = function(
  filepath
) {
  let data = fs.readFileSync(filepath, 'utf8')
  return data
})

/* This method can be used to write to a file.
 * @param  {string}  filepath  The file path of the file to which we need to write the data.
 * @param  {string}  data      The data that needs to be writtent to the file.
 */
exports.writeFile = function(filepath, data) {
  fs.writeFile(filepath, data, 'utf8', function(err, data) {
    if (err) {
      reject(err)
    }
    return data
  })
}

/*
 * Rename all the .source files to .html files in a given directory.
 */
const renameFile = (exports.renameFile = function(dir) {
  let allFiles = getFiles(dir)
  allFiles.forEach(function(file) {
    let oldname = file
    let newname = file.replace('.source.txt', '.html')

    fs.rename(oldname, newname, function(err) {
      if (err) console.log('ERROR: ' + err)
    })
  })
})

/*
 * Returns true if the given path is a directory
 */
const isDirectory = (exports.isDirectory = function(path) {
  return fs.lstatSync(path).isDirectory()
})
