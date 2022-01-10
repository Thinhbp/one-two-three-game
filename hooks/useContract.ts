import { constants, utils } from "ethers"
import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { Contract } from "@ethersproject/contracts"
import GameContract from '../chain-info/Contract.json'
import networksMapping from '../chain-info/networks.json'
import chainIds from '../chain-info/chainIds.json'


export const useContract = () => {

    const { chainId } = useEthers()
    const abi = GameContract
    const network = chainId ? chainIds[chainId] : 'dev'
    const contractAddress = chainId ? networksMapping[network]['GameContract'] : constants.AddressZero
    const contractInterface = new utils.Interface(abi)
    const contractInstance = new Contract(contractAddress, contractInterface)
    // console.log('contract init', contractAddress)

    const useGetOpeningRooms = () => {
        const [result] = useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'getOpeningRooms',
            args: []
        }) ?? [[]]
        const rooms = result
        console.log('getOpeningRooms', rooms)
        return rooms
    }

    const useGetPlayerRooms = (address: string) => {
        const [result] = useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'getPlayerRooms',
            args: [address]
        }) ?? [[]]
        const rooms = result
        console.log('getPlayerRooms', rooms)
        return rooms
    }

    const getRoom = async (index: number) => {
        return contractInstance.rooms(index)
    }

    const { send: createRoom, state: createRoomState } = useContractFunction(contractInstance, 'createRoom', {
        transactionName: 'createRoom',
    })

    const { send: sendHashcode, state: sendHashcodeState } = useContractFunction(contractInstance, 'sendHashcode', {
        transactionName: 'sendHashcode',
    })

    const { send: sendSecret, state: sendSecretState } = useContractFunction(contractInstance, 'sendSecret', {
        transactionName: 'sendSecret',
    })

    const { send: sendWithdraw, state: withdrawState } = useContractFunction(contractInstance, 'withdraw', {
        transactionName: 'withdraw',
    })

    return {
        getRoom,
        useGetOpeningRooms,
        useGetPlayerRooms,

        createRoom,
        createRoomState,

        sendHashcode,
        sendHashcodeState,

        sendSecret,
        sendSecretState,

        sendWithdraw,
        withdrawState,
    }

}