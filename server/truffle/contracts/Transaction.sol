// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Transaction {
    mapping(uint256 => string) transactions;

    function addTransaction(uint256 txId, string memory _hash) public {
        transactions[txId] = _hash;
    }

    function getHashByTransactionId(uint256 txId)
        public
        view
        returns (string memory)
    {
        return transactions[txId];
    }
}
