const Transaction = artifacts.require("Transaction")

module.exports = function(deployer) {
  // Command Truffle to deploy the Smart Contract
  deployer.deploy(Transaction);
};