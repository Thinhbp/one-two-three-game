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

    const getOpeningRooms = async () => {
        try {
            const data = await contractInstance.methods.getOpeningRooms().call()
            console.log('getOpeningRooms', data)
            return [...data]
        } catch (e) {
            return []
        }
    }

    const getPlayerRooms = async (address: string) => {
        try {
            const data = await contractInstance.methods.getPlayerRooms(address).call()
            console.log('getPlayerRooms', data)
            return [...data]
        } catch (e) {
            return []
        }
    }

    const getRoom = async (id: number) => {
        try {
            const data = await contractInstance.methods.rooms(id).call()
            console.log('getRoom', id, data)
            return data
        } catch (e) {
            return []
        }
    }

    return {
        getOpeningRooms,
        getPlayerRooms,
        getRoom,
    }

}