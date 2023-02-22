const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        //this function is called anonymus because it doesn't have a name
        // const blockTask = async function() => {}
        // async function blockTask(){}
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)
