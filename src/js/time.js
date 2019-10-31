let time = {
  // 定义循环
  // @param {function} fun 要执行的函数
  // @param {int} time 多长时间循环一次
  // @param {function} isOut 返回为true时退出循环
  timer(fun,time,isOut){
    // 用于循环中交换数据
    let obj = {}
    let interval = setInterval(function(){
      fun(obj)
      if(isOut(obj)){
        clearInterval(interval)
      }
    }, time)
  },
  // 格式化时间,时间戳转时间
  format(date){
    var now = new Date(date),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
  },
  // 获取时间戳
  timestamp(date){
    if(date){
      return Math.round(new Date() / 1000)
    }
    Math.round(new Date() / 1000)
  },
  // 获取标签上需要的时间格式
  getbegtime() {
    let today = new Date()
    let yyyy = today.getFullYear()
    let MM = today.getMonth() + 1
    let dd = today.getDate()
    let hh = today.getHours()
    let mm = today.getMinutes()
    MM = checkTime(MM)
    dd = checkTime(dd)
    hh = checkTime(hh)
    mm = checkTime(mm)
    let time = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm
    return time

    function checkTime(i){
      if (i < 10) {
        i = "0" + i
      }
      return i
    }
  }
}

module.exports = time