/*var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/YOUR_INFURA_API_KEY')

const account1 = '' // Your account address 1
const account2 = '' // Your account address 2

const privateKey1 = Buffer.from('YOUR_PRIVATE_KEY_1', 'hex')
const privateKey2 = Buffer.from('YOUR_PRIVATE_KEY_2', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})*/

/*
const Web3 = require('web3')
let web3Provider = new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws")
var web3Obj = new Web3(web3Provider)

var subscription = web3Obj.eth.subscribe('logs', {
    address: '0x4d3218B23D4f383dA54df6dDFf4833a9d36F75c3', //Smart contract address
    //topics: ['0x4d3218B23D4f383dA54df6dDFf4833a9d36F75c3'] //topics for events
}, function(error, result) {

    if (error)
      console.log(error)

    console.log(result)

}).on("data", function(trxData){
  console.log("Event received", trxData)
  //Code from here would be run immediately when event appeared
})*/

const Web3 = require('web3')
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/225a510e91ff4a5ca736aa438cc7f4d6')
//const web3 = new Web3('https://ropsten.infura.io/v3/225a510e91ff4a5ca736aa438cc7f4d6')
//ropsten.infura.io/v3/225a510e91ff4a5ca736aa438cc7f4d6

console.log('Subscribe')

function checkStatus(txHash) {
  console.log('Check status for', txHash)
  var myVar = setInterval(runner, 1000)

  function runner() {
    console.log('runner', txHash)

    web3.eth.getTransactionReceipt(txHash, function(err, success) {
      console.log('Get Transaction receipt')
      if (err) {
        console.log('Failed to get transaction receipt', err)
      }
        
      if (success) {
        console.log('Payment successful', success)

        if (success.status === true) {
          console.log('Payment successful')
          clearInterval(myVar)
          web3.currentProvider.connection.close()
          //return;
        } else if (success.status === false) {
          console.log('Payment failed')
          clearInterval(myVar)
          web3.currentProvider.connection.close()
        }
      }
    })

    console.log('Runner end')
  }
}

//checkStatus('0x5a31c18d8d78cbce52fe1723fd935285743cbac817c7542ad521c51885c56ff8')

var counter = 0
const subscription = web3.eth.subscribe(
  'pendingTransactions', 
  function (error, result) {
    console.log('ERROR: ', error)
    console.log('RESULT: ', result)

  }).on('data',
    function (transactionHash) {
      web3.eth.getTransaction(transactionHash)
        .then(function (transaction) {
          //createNode(transaction.from, transaction.to);
          
          //console.log('From: ', transaction.from, typeof transaction.from)
          //console.log('To: ', transaction.to, typeof transaction.to)

          
          if (transaction !== null) {

            counter = counter + 1

            console.log(counter)
            console.log(transaction)
            web3.eth.getTransactionReceipt(transaction.hash, function(err, success) {

              if (err) {
                console.log('Failed to get transaction receipt', err)
                return
              }

              console.log('TX receipt', success)
                
            })


            /*if (transaction.from === '0x4d3218B23D4f383dA54df6dDFf4833a9d36F75c3') {
              console.log('Caught Transaction FROM: 0x4d3218B23D4f383dA54df6dDFf4833a9d36F75c3')
              console.log(transaction)


              
              console.log('Picked up a hex transaction')
                console.log('That\'s my address: 0xF3b5E90891a7852098F34D39DA96bc65A8b425BC')
                console.log('From: ', transaction.from, typeof transaction.from)
                console.log('To: ', transaction.to, typeof transaction.to)
                console.log('Hash: ', transaction.hash, typeof transaction.hash)
  
                subscription.unsubscribe(function (error, success) {
                  if (success)
                      console.log('Successfully unsubscribed!')
                })
  
                //checkStatus(transaction.hash)
            }

            if (transaction.to === '0xF3b5E90891a7852098F34D39DA96bc65A8b425BC') {
              console.log('Caught Transaction TO: 0xF3b5E90891a7852098F34D39DA96bc65A8b425BC')
              console.log(transaction)
            }

            if (transaction.from === '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39') {
              console.log('Caught Transaction FROM: 0x2b591e99afe9f32eaa6214f7b7629768c40eeb39')
              console.log(transaction)
            }
            
            //if (transaction.to === '0x4d3218B23D4f383dA54df6dDFf4833a9d36F75c3') {
            //if (transaction.to === '0xF3b5E90891a7852098F34D39DA96bc65A8b425BC') {
            if (transaction.to === '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39') {
                console.log('Caught Transaction TO: 0x2b591e99afe9f32eaa6214f7b7629768c40eeb39')
                console.log(transaction)
                console.log('Picked up a hex transaction')
                console.log('That\'s my address: 0xF3b5E90891a7852098F34D39DA96bc65A8b425BC')
                console.log('From: ', transaction.from, typeof transaction.from)
                console.log('To: ', transaction.to, typeof transaction.to)
                console.log('Hash: ', transaction.hash, typeof transaction.hash)
  
                subscription.unsubscribe(function (error, success) {
                  if (success)
                      console.log('Successfully unsubscribed!')
                })
  
  
                
                //checkStatus(transaction.hash)
              
            }*/

          }
  })
})


/*
subscription.unsubscribe(function (error, success) {
    if (success)
        console.log('Successfully unsubscribed!');
});*/




