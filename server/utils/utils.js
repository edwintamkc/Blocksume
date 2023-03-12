import Web3 from 'web3'

const getHashByString = (str) => {
    return Web3.utils.sha3(str)
}

export default { getHashByString }