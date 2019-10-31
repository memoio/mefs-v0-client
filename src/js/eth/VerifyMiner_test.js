function test(){
  let abi = [{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_isCustom","type":"bool"},{"name":"_customDeposit","type":"uint256"}],"name":"setCustom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"applyMiner","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"outMiner","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"address"}],"name":"get","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
  let address = '0x9e4af0964ef92095ca3d2ae0c05b472837d8bd37'
  let pk = '0x928969b4eb7fbca964a41024412702af827cbc950dbe9268eae9f5df668c85b4'
  let vm = new VerifyMiner(abi,address,pk)
  let res = ''
  let acc = '0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6'
  // res = vm.get(acc)
  // res = vm.getDeposit()
  // res = vm.getUserDeposit(acc)
  // res = vm.setCustom(true,'10000000')
  // res = vm.applyMiner('10000000')
  // res = vm.outMiner()
  console.log(res)
}