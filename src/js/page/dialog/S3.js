class Dialog {
  constructor(val = 'd3'){
    let box = dq('#dialog>.dialog.'+val)
    box.q('div:first-child').onclick = function(e){
      e.stopPropagation()
    }
    box.onclick = function(){
      box.style = ''
    }
    this.box = box
  }
  // 显示提示框
  show(callback){
    callback(this.box.q('div:first-child'))
    this.box.style = 'display:block'
  }
  // 隐藏提示框
  hide(){
    this.box.style = ''
  }
}

module.exports = Dialog