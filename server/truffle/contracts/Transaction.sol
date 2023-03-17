// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Transaction {
    mapping(uint256 => string) transactions;
    uint256 transactionsSize;

    function addTransaction(uint256 txId, string memory _hash) public {
        transactions[txId] = _hash;
        transactionsSize = txId;
    }

    function getHashByTransactionId(
        uint256 txId
    ) public view returns (string memory) {
        return transactions[txId];
    }

    function getAllTransaction() public view returns (string[] memory) {
        string[] memory result = new string[](transactionsSize);
        for (uint i = 0; i < transactionsSize; i++) {
            result[i] = transactions[i+1];
        }

        return result;
    }
}
