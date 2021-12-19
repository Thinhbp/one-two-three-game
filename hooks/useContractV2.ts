import { constants, utils } from "ethers"
import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { Contract } from "@ethersproject/contracts"
import GameContract from '../chain-info/Contract.json'
import networksMapping from '../chain-info/networks.json'
import chainIds from '../chain-info/chainIds.json'
import Web3 from 'web3'

export const useContractV2 = () => {

    const { chainId } = useEthers()
    const abi: any = GameContract
    const network = chainId ? chainIds[chainId] : 'dev'
    const contractAddress = chainId ? networksMapping[network]['GameContract'] : constants.AddressZero
    const web3js = new Web3(Web3.givenProvider)
    const contractInstance = new web3js.eth.Contract(abi, contractAddress)

    const getRoom = async (index: number) => {
        console.log('-> get room v2', index)
        const data = await contractInstance.methods.arrRoom(index + '').call()
        if (!data) return null
        data.Id = index
        console.log('get room v2', index, data)
        return data
    }

    return {
        getRoom
    }

}