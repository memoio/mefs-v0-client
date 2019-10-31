// 模板

class Template{
  // 渲染
  // 只能处理标签的内容
  // @param html 要处理的字符串
  render(html){
    let data = html.replace(/\$\{.*?\}/g,res=>{
      res = res.substring(2,res.length-1)
      res = eval(res)
      return res
    })
    return data
  }
}

module.exports = Template