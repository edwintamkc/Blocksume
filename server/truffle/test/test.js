const Transaction = artifacts.require("Transaction")

contract('Transaction', () => {
    it('update data', async () => {
        const transaction = await Transaction.new()
        await transaction.addTransaction(0, '0x12345678')

        const data = await transaction.getHashByTransactionId(0)
        assert(data === '0x12345678')
    })
})