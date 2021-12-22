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

    const useGetRooms = () => {
        const [result] = useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'room_status',
            args: []
        }) ?? [[]]
        const rooms = result.map((r: any) => r.toNumber())
        console.log('get rooms status', rooms)
        return rooms
    }

    const useGetRoom = async (index: number) => {
        const result = useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'arrRoom',
            args: [index]
        }) ?? []
        return result
    }

    const getRoom = async (index: number) => {
        return contractInstance.arrRoom(index)
    }

    const { send: sendSelectGuess, state: selectGuessState } = useContractFunction(contractInstance, 'select_guess', {
        transactionName: 'select_guess',
    })

    const { send: sendInputSecret, state: inputSecretState } = useContractFunction(contractInstance, 'input_secret', {
        transactionName: 'input_secret',
    })

    const { send: sendWithdraw, state: withdrawState } = useContractFunction(contractInstance, 'withdraw', {
        transactionName: 'withdraw',
    })

    return {
        useGetRooms,
        useGetRoom,
        getRoom,

        sendSelectGuess,
        selectGuessState,

        sendInputSecret,
        inputSecretState,

        sendWithdraw,
        withdrawState,
    }

}