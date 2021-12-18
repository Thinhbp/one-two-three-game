import { constants, utils } from "ethers"
import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { Contract } from "@ethersproject/contracts"
import GameContract from '../chain-info/Contract.json'
import networksMapping from '../chain-info/networks.json'
import chainIds from '../chain-info/chainIds.json'


export const useContract = () => {

    const { chainId } = useEthers()
    const { abi } = GameContract
    const network = chainId ? chainIds[chainId] : 'dev'
    const contractAddress = chainId ? networksMapping[network]['CryptoZombies'] : constants.AddressZero
    const contractInterface = new utils.Interface(abi)
    const contractInstance = new Contract(contractAddress, contractInterface)

    const useGetZombie = (index: number) => {
        const zombie = useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'zombies',
            args: [
                index,
            ]
        }) ?? []
        return zombie
    }

    const useGetZombiesByOwner = (owner: string | null | undefined) => {
        const [zombies] = useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'getZombiesByOwner',
            args: [
                owner,
            ]
        }) ?? [[]]
        return zombies.map((z: any) => z.toNumber())
    }

    const { send, state } = useContractFunction(contractInstance, 'createRandomZombie', {
        transactionName: 'createRandomZombie',
    })

    return {
    }

}