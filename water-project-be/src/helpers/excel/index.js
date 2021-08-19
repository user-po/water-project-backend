const xlsx = require('node-xlsx')

// const workSheet = xlsx.parse(`${__dirname}/test.xlsx`)

// console.log(workSheet)

const loadExcel = (path)=>{
  return xlsx.parse(path)
}

const getFirstSheet = (sheets)=>{
  return sheets[0].data;
}

module.exports = {
     loadExcel,
     getFirstSheet
}