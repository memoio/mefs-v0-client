let css = {
  // 删除一个属性
  // @param {object} obj 要处理的对象
  // @param {string} cn 要删除的属性名
  removeClass(obj,cn){
    let cnList = obj.className.split(' ')
    for(let i=0; i<cnList.length; i++){
      if(cnList[i] == cn){
        cnList[i] = ''
      }
    }
    obj.className = cnList.join(' ')
  },
  // 判断是否有某个类
  havaClass(obj,cn){
    let cnList = obj.className.split(' ')
    for(let i=0; i<cnList.length; i++){
      if(cnList[i] == cn){
        return true
      }
    }
    return false
  },
  addClass(obj,cn){
    let cnList = obj.className.split(' ')
    let flag = true
    for(let i=0; i<cnList.length; i++){
      if(cnList[i] == cn){
        flag = false
      }
    }
    if(flag){
      cnList.push(cn)
      obj.className = cnList.join(' ')
    }
  },
  // 转换css,只有一个对象添加类,其它则去掉此类
  convertAddClassByGroup(list,index,cn){
    for(let i=0; i<list.length; i++){
      this.removeClass(list[i],cn)
    }
    this.addClass(list[index],cn)
  },
  convertRemoveClassByGroup(list,index,cn){
    for(let i=0; i<list.length; i++){
      this.addClass(list[i],cn)
    }
    this.removeClass(list[index],cn)
  },
}

export default css