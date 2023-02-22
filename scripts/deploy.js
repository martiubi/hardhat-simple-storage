//imports
const { ethers, run, network } = require("hardhat")

//async main
async function main() {
    // Deploy starts
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    //console.log(network.config)
    if (network.config.chainId === 5 && process.env.ETHERCAN_API_KEY) {
        console.log("Waiting for block confirmations ..")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }
    // Deploy ends
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current values is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

// Verify a contract programatically

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
