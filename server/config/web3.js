import Web3 from 'web3'
import configuration from '../truffle/build/contracts/Transaction.json' assert { type: "json" }

// web 3 config
const web3 = new Web3('http://127.0.0.1:7545')
const contract = new web3.eth.Contract(configuration.abi, configuration.networks['5777'].address)
const accounts = await web3.eth.getAccounts()
const ethAccount = accounts[0]

export { contract, ethAccount }