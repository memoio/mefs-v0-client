let root = __dirname+'/'
let config = {
  root:root,
  // 以太坊地址
  ethUrl:'/eth/',
  // 后端地址
  backUrl:'/ethBack',
  // 智能合约
  contracts:{
    indexer:{
      address:'0x9e4af0964ef92095ca3d2ae0c05b472837d8bd37',
      abi:[{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"resolver","type":"address"}],"name":"Add","type":"event","signature":"0xec689a3871c35587e4800f14216f987ee744b924aff21741edc2e167e2dd43e8"},{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"form","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterResolver","type":"event","signature":"0x0a7047ba8be4d874e67aebc953a70ff6db03a81782549290ac646e0738ddfc04"},{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"form","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x46bd035a76a8302bb74520f9226b59925d8186784298f88ad636a4ea46b85b21"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"resolver","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x2bffc7ed"},{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x693ec85e"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"resolver","type":"address"}],"name":"alterResolver","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xcbdc3fe1"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"owner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf60b53e2"}],
    },
    mapper:{
      abi:[{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0ca05f9f"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893d20e8"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"Add","type":"event","signature":"0x87dc5eecd6d6bdeae407c426da6bfba5b7190befc554ed5d4d62dd5cf939fbae"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e90"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0a3b0a4f"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6d4ce63c"}],
      bin:'0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610770806100536000396000f3fe608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a3b0a4f146100675780630ca05f9f146100d05780636d4ce63c14610139578063893d20e8146101a5575b600080fd5b34801561007357600080fd5b506100b66004803603602081101561008a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101fc565b604051808215151515815260200191505060405180910390f35b3480156100dc57600080fd5b5061011f600480360360208110156100f357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610418565b604051808215151515815260200191505060405180910390f35b34801561014557600080fd5b5061014e6105e9565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610191578082015181840152602081019050610176565b505050509050019250505060405180910390f35b3480156101b157600080fd5b506101ba610677565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103a55761025c826106a0565b156102d2577f08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa60405180806020018281038252600f8152602001807fe5b7b2e69c89e6ada4e59cb0e59d80000000000000000000000000000000000081525060200191505060405180910390a1600090506103a0565b60018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507f87dc5eecd6d6bdeae407c426da6bfba5b7190befc554ed5d4d62dd5cf939fbae82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1600190505b610412565b7f08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa60405180806020018281038252600e8152602001807fe4bda0e4b88de698af6f776e657200000000000000000000000000000000000081525060200191505060405180910390a1610413565b5b919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156105765760008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e908184604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a160019150506105e3565b7f08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa60405180806020018281038252600e8152602001807fe4bda0e4b88de698af6f776e657200000000000000000000000000000000000081525060200191505060405180910390a16105e4565b5b919050565b6060600180548060200260200160405190810160405280929190818152602001828054801561066d57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610623575b5050505050905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080600090505b600180549050811015610739578273ffffffffffffffffffffffffffffffffffffffff166001828154811015156106db57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561072c57600191505061073f565b80806001019150506106a8565b50600090505b91905056fea165627a7a723058206b2be1ac246fb8953174f7c1bb0663282da097fd8d77e73720a1f493c67f45010029',
    },
    offer:{
      abi:[{"inputs":[{"name":"capacity","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"anonymous":false,"inputs":[{"indexed":true,"name":"data","type":"uint256"}],"name":"LogInt","type":"event","signature":"0xc8fa9a7021af252bc69defe2b981f7bd7858defe2a87641768fefdb8a03a07cd"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6d4ce63c"}],
      bin:'0x608060405234801561001057600080fd5b5060405160608061016b8339810180604052606081101561003057600080fd5b81019080805190602001909291908051906020019092919080519060200190929190505050606060405190810160405280848152602001838152602001828152506000808201518160000155602082015181600101556040820151816002015590505050505060c7806100a46000396000f3fe608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636d4ce63c146044575b600080fd5b348015604f57600080fd5b506056607a565b60405180848152602001838152602001828152602001935050505060405180910390f35b6000806000806000015460006001015460006002015492509250925090919256fea165627a7a7230582059163bc204f7c6c0061524c016c99aea0276ad47c1e97cb689a5330e9034f8e70029',
    },
    query:{
      abi:[{"inputs":[{"name":"capacity","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"price","type":"uint256"},{"name":"ks","type":"uint256"},{"name":"ps","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"data","type":"uint256"}],"name":"LogInt","type":"event"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setCompleted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],
      bin:'0x608060405234801561001057600080fd5b5060405160a0806102b0833981018060405260a081101561003057600080fd5b81019080805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919050505060c060405190810160405280868152602001858152602001848152602001602060405190810160405280858152508152602001602060405190810160405280848152508152602001600015158152506000808201518160000155602082015181600101556040820151816002015560608201518160030160008201518160000155505060808201518160040160008201518160000155505060a08201518160050160006101000a81548160ff0219169083151502179055509050505050505050610178806101386000396000f3fe60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e5295ee146100515780636d4ce63c14610080575b600080fd5b34801561005d57600080fd5b506100666100d2565b604051808215151515815260200191505060405180910390f35b34801561008c57600080fd5b506100956100f9565b6040518087815260200186815260200185815260200184815260200183815260200182151515158152602001965050505050505060405180910390f35b60006001600060050160006101000a81548160ff0219169083151502179055506001905090565b6000806000806000806000800154600060010154600060020154600060030160000154600060040160000154600060050160009054906101000a900460ff1695509550955095509550955090919293949556fea165627a7a72305820176b3ff319dd660ba588c53f64f78f7c6ac83cc1062b2e2d05136f0fb0d1a8d50029',
    },
    offerResolver:{
      address:'',
      abi:[{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"mapper","type":"address"}],"name":"Add","type":"event","signature":"0x473b736fe95295e8fbc851ca8acdc12a750976edad27a92f666b3d888eb895d3"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterMapper","type":"event","signature":"0xa74fe41d06f59ab4da1dec9b736b2e9cc0b6f36b502d0c5276c5e52b2f2f8dd2"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0a3b0a4f"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"get","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"alterMapper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xac5c505e"}],
    },
    queryResolver:{
      address:'',
      abi:[{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"mapper","type":"address"}],"name":"Add","type":"event","signature":"0x473b736fe95295e8fbc851ca8acdc12a750976edad27a92f666b3d888eb895d3"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterMapper","type":"event","signature":"0xa74fe41d06f59ab4da1dec9b736b2e9cc0b6f36b502d0c5276c5e52b2f2f8dd2"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0a3b0a4f"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"get","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"alterMapper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xac5c505e"}],
    },
    miner:{
      "address":"",
      "abi":[{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0ca05f9f"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893d20e8"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e90"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"_isCustom","type":"bool"},{"name":"_customDeposit","type":"uint256"}],"name":"setCustom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x4db58042"},{"constant":true,"inputs":[{"name":"key","type":"address"}],"name":"get","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"},{"constant":true,"inputs":[],"name":"getDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc399ec88"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc084b10b"},{"constant":false,"inputs":[],"name":"applyMiner","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x83ae5685"},{"constant":false,"inputs":[],"name":"outMiner","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0xa02eaaf6"},{"constant":true,"inputs":[],"name":"getAllAddress","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x715b208b"}]
    },
    keeper:{
      "address":"",
      "abi":[{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0ca05f9f"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893d20e8"},{"inputs":[{"name":"_deposit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"value","type":"bool"}],"name":"Set","type":"event","signature":"0xa09d518561e304be3f7de32d470dadb560b3bc168a5bad632dba82666dda9589"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"},{"indexed":false,"name":"money","type":"uint256"}],"name":"Pledge","type":"event","signature":"0x5e91ea8ea1c46300eb761859be01d7b16d44389ef91e03a163a87413cbf55b95"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"},{"indexed":false,"name":"money","type":"uint256"},{"indexed":false,"name":"status","type":"bool"}],"name":"CancelPledge","type":"event","signature":"0xa70461ebff4d11e6f321ed483fa2998132842461adfbbae6d10dc5f3b9b23058"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"}],"name":"ApplyCancelPledge","type":"event","signature":"0x8444089032f19005a69aa5d9fa82009aee6241c0c090430f53abe2d6d890697c"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e90"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"value","type":"bool"}],"name":"setWhitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x53d6fd59"},{"constant":false,"inputs":[{"name":"_deposit","type":"uint256"}],"name":"setDeposit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf5bade66"},{"constant":true,"inputs":[],"name":"getDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc399ec88"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"value","type":"bool"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x35e3b25a"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"isKeeper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6ba42aaa"},{"constant":true,"inputs":[],"name":"getAllAddress","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x715b208b"},{"constant":false,"inputs":[],"name":"pledge","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x88ffe867"},{"constant":false,"inputs":[],"name":"cancelPledge","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x28c418cf"},{"constant":false,"inputs":[{"name":"acc","type":"address"},{"name":"sum","type":"uint256"},{"name":"status","type":"bool"}],"name":"setCancelPledgeStatus","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0xd78ed5da"},{"constant":true,"inputs":[{"name":"acc","type":"address"}],"name":"info","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x0aae7a6b"},{"constant":true,"inputs":[{"name":"acc","type":"address"}],"name":"get","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"}]
    },
    provider:{
      "address":"",
      "abi":[{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0ca05f9f"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893d20e8"},{"inputs":[{"name":"_size","type":"uint256"},{"name":"_deposit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"value","type":"bool"}],"name":"Set","type":"event","signature":"0xa09d518561e304be3f7de32d470dadb560b3bc168a5bad632dba82666dda9589"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"},{"indexed":false,"name":"money","type":"uint256"}],"name":"Pledge","type":"event","signature":"0x5e91ea8ea1c46300eb761859be01d7b16d44389ef91e03a163a87413cbf55b95"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"},{"indexed":false,"name":"money","type":"uint256"},{"indexed":false,"name":"status","type":"bool"}],"name":"CancelPledge","type":"event","signature":"0xa70461ebff4d11e6f321ed483fa2998132842461adfbbae6d10dc5f3b9b23058"},{"anonymous":false,"inputs":[{"indexed":false,"name":"acc","type":"address"}],"name":"ApplyCancelPledge","type":"event","signature":"0x8444089032f19005a69aa5d9fa82009aee6241c0c090430f53abe2d6d890697c"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e90"},{"constant":false,"inputs":[{"name":"_size","type":"uint256"}],"name":"setSize","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x170ab405"},{"constant":true,"inputs":[],"name":"getSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xde8fa431"},{"constant":false,"inputs":[{"name":"_deposit","type":"uint256"}],"name":"setDeposit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf5bade66"},{"constant":true,"inputs":[],"name":"getDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc399ec88"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"value","type":"bool"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x35e3b25a"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"isProvider","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6b074a07"},{"constant":true,"inputs":[],"name":"getAllAddress","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x715b208b"},{"constant":true,"inputs":[{"name":"_size","type":"uint256"}],"name":"getPledgeMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xe1493261"},{"constant":false,"inputs":[{"name":"_size","type":"uint256"}],"name":"pledge","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x7326c9c0"},{"constant":false,"inputs":[],"name":"cancelPledge","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x28c418cf"},{"constant":false,"inputs":[{"name":"acc","type":"address"},{"name":"sum","type":"uint256"},{"name":"status","type":"bool"}],"name":"setCancelPledgeStatus","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0xd78ed5da"},{"constant":true,"inputs":[{"name":"acc","type":"address"}],"name":"info","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x0aae7a6b"},{"constant":true,"inputs":[{"name":"acc","type":"address"}],"name":"get","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"}]
    }
  }
}
let log = console.log,
dir = console.dir
let obj = {
  // 给对象添加或设置属性
  attr(obj,attr){
    for(let v in attr){
      obj[v] = attr[v]
    }
  }
}
let global = window

obj.attr(global,{
  log:log,
  dir:dir,
  obj,
  dq:function(key){
    return document.querySelector(key)
  },
  dqa:function(key){
    return document.querySelectorAll(key)
  },
})
Element.prototype.q = function(key){
  return this.querySelector(key)
}
Element.prototype.qa = function(key){
  return this.querySelectorAll(key)
}

import account from './account'
import css from './css'
import axios from 'axios'
let web3 = new Web3(new Web3.providers.HttpProvider(config.ethUrl))
let time = require('./time')
let Template = require('./Template')
let tp = new Template()
let languagePack = require('./languagePack')
global.lp = languagePack.get

global.app = {
  config:config,
  axios:axios,
  css:css,
  account:account,
  web3,time,tp,languagePack
}
// 渲染页面
// 保存最初的模板
let template = {
  'title':dq('title').innerHTML,
  'body':dq('body').innerHTML
}
global.app.template = template
// languagePack.setLang('en')
// dq('title').innerHTML = tp.render(template['title'])
// dq('body').innerHTML = tp.render(template['body'])

let page = require('./page/index').default
let Eth = require('./eth')
let eth = new Eth()
let VerifyMiner = require('./eth/VerifyMiner')
let pledge = require('./eth/Pledge')
let Offer = require('./eth/Offer')
let Query = require('./eth/Query')
let Mapper = require('./eth/Mapper')
let Resolver = require('./eth/Resolver')
let KeeperPledge = pledge.KeeperPledge
let ProviderPledge = pledge.ProviderPledge
let back = require('./back')

obj.attr(global.app,{
  page,eth,back,
  VerifyMiner,KeeperPledge,ProviderPledge,
  Offer,Query,Mapper,
  Resolver,
})

function initCtConfig(){
  // 获取Indexer合约对象
  let indexer = web3.eth.contract(config.contracts.indexer.abi).at(config.contracts.indexer.address)
  // 获取最新的相应的合约地址 miner keeper provider
  config.contracts.miner.address = indexer.get('miner')[1]
  config.contracts.keeper.address = indexer.get('keeper')[1]
  config.contracts.provider.address = indexer.get('provider')[1]
  config.contracts.offerResolver.address = indexer.get('offer')[1]
  config.contracts.queryResolver.address = indexer.get('query')[1]
}
// 创建相关合约对象

// let offerResolver = new Resolver()
// web3.eth.contract(config.contracts.offerResolver.abi).at(config.contracts.offerResolver.address)
// let queryResolver = web3.eth.contract(config.contracts.queryResolver.abi).at(config.contracts.queryResolver.address)
// obj.attr(global.app,{
//   offerResolver,queryResolver,
// })

// let res
// let pk = '0x928969b4eb7fbca964a41024412702af827cbc950dbe9268eae9f5df668c85b4'
// let offer = new Offer(config.contracts.offer.abi,config.contracts.offer.bin,pk)
// res = offer.deploy(100,1562984540,10)
// log(res)
// let query = new Query(config.contracts.query.abi,config.contracts.query.bin,pk)
// res = query.deploy(100,24,1000,1,1)
// log(res)
// let mapper = new Mapper(config.contracts.mapper.abi,config.contracts.mapper.bin,pk)
// res = mapper.deploy()
// log(res)

// 初始化页面
// page.init()
// 切换语言
// @param {string} lang 语言代码
function changeLang(lang){
  app.languagePack.setLang(lang)
  dq('title').innerHTML = app.tp.render(app.template['title'])
  dq('body').innerHTML = app.tp.render(app.template['body'])
  // 修改切换语言按钮
  dq('#header span').innerHTML = dq(`#header li[title=${app.languagePack.lang}]`).innerHTML
  // 更改地址栏
  history.pushState(null, null, '/'+lang+window.location.pathname.slice(3))
  app.page.init()
  initCtConfig()
}
global.app.lang = {changeLang}
// 根据地址来进行语言切换
if(/^\/zh\//.test(window.location.pathname)){
  changeLang('zh')
}else if(/^\/en\//.test(window.location.pathname)){
  changeLang('en')
}else{
  changeLang('zh')
}