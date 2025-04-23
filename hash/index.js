const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

let log = console.log

// 获取文件的hash sha1
// @param {string} file 文件名
// @param {int} n 要取几位
// @return {string}
function getHash(file,n){
  let buf = fs.readFileSync(file)
  let hash = crypto.createHash('sha1')
  hash.update(buf)
  let res = hash.digest('hex')
  if(n && n<res.length){
    res = res.substring(0,n)
  }
  return res
}
// 读取html
let cl = {
  // 把html文件中的图片,css,js加上?hash
  // @param {string} file html文件名
  // @param {int} n hash要取前几位
  addHash(file,n){
    let baseName = path.dirname(file)+'/'
    let data = fs.readFileSync(file,'utf8')
    // <link href="">
    // <script src=""></script>
    // <img src="">
    data = data.replace(/<link.*?href=".*?">/g,res=>{
      return res.replace(/href=".*?"/g,res=>{
        let file = res.substring(6,res.length-1)
        let hash = getHash(baseName+file,n)
        return `href="${file}?${hash}"`
      })
    })
    data = data.replace(/<script src=".*?"><\/script>/g,res=>{
      // log(res)
      return res.replace(/src=".*?"/g,res=>{
        let file = res.substring(5,res.length-1)
        let hash = getHash(baseName+file,n)
        return `src="${file}?${hash}"`
      })
    })
    data = data.replace(/<img.*?src=".*?">/g,res=>{
      // log(res)
      return res.replace(/src=".*?"/g,res=>{
        let file = res.substring(5,res.length-1)
        let hash = getHash(baseName+file,n)
        return `src="${file}?${hash}"`
      })
    })
    return data
  }
}

// node index.js index.html out.html
// 命令 输入html文件名 输出文件名
let input = process.argv[2]
let out = process.argv[3]
if(input && out){
  let res = ''
  res = cl.addHash(input,8)
  fs.writeFileSync(out,res)
}