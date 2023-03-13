import Web3 from 'web3'
import moment from 'moment'

const getHashByString = (str) => {
    return Web3.utils.sha3(str)
}

// accept 'YYYY-MM-DD'
const parseStringToDate = (str) => {
    var strArray = str.split("-")
    var date = new Date(strArray[0], strArray[1] - 1, strArray[2])
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export { getHashByString, parseStringToDate }