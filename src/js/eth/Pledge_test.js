function testKeeperPledge(){
  let abi = [{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"},{"indexed":false,"name":"money","type":"uint256"}],"name":"Pledge","type":"event","signature":"0x5e91ea8ea1c46300eb761859be01d7b16d44389ef91e03a163a87413cbf55b95"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"},{"indexed":false,"name":"money","type":"uint256"}],"name":"CancelPledge","type":"event","signature":"0x9486d53a336264909178a4950af45bf46fdf77b577a2e5ccdbec738ea82553a0"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[],"name":"pledge","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x88ffe867"},{"constant":false,"inputs":[],"name":"cancelPledge","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x28c418cf"},{"constant":true,"inputs":[{"name":"acc","type":"address"}],"name":"info","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x0aae7a6b"}]
  let address = '0x0873384DDfeB8BF461e037E819b7e03f6A4B9753'
  let pk = '0x928969b4eb7fbca964a41024412702af827cbc950dbe9268eae9f5df668c85b4'
  let acc = '0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6'
  let ct = new KeeperPledge(abi,address,pk)
  let res = ''
  // res = ct.pledge()
  // res = ct.cancelPledge()
  res = ct.info(acc)
  console.log(res)
}
// testKeeperPledge()