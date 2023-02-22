const { ethers } = require("hardhat")
//const { describe, beforeEach, it } = require("node:test")
const { assert, expect } = require("chai")
//const { it } = require("node:test")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //assert
        //expect
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add a person to the array", async function () {
        const expectedValueName = "Juan"
        const expectedValueFavNum = "12"
        const expectedValue = "Juan,12"
        const transactionResponse = await simpleStorage.addPerson(
            expectedValueName,
            expectedValueFavNum
        )
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrievePerson("0")
        assert.equal(currentValue.toString(), expectedValue)
    })
})
