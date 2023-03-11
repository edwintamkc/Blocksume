// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Transaction {
    mapping(uint => string) transactions;

    function addTransaction(uint txId, string memory _hash) public {
        transactions[txId] = _hash;
    }

    function getHashByTransactionId(uint txId)
        public
        view
        returns (string memory)
    {
      return transactions[txId];
    }
}
