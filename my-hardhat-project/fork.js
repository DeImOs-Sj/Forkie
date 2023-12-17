const { ethers, JsonRpcProvider, Web3Provider, parseUnits, getDefaultProvider } = require('ethers')
const axios = require('axios')



require('dotenv').config()

const provider = new getDefaultProvider('http://127.0.0.1:8545/')

const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const curveAddress = '8xbEbc44782C7d88a1A60Cb6fe97d0b483032FF1C7'

const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${curveAddress}&apikey=3RBPZMD1699SV6RSDEM6G1SH8CYIIIXW43`


async function main() {

    const wallet = new ethers.Wallet(process.env.WALLET_SECRET)

    const connectedWallet = wallet.connect(provider)

    const ERC20ABI = require('./abi.json')

    const wethContract = new ethers.Contract(wethAddress, ERC20ABI, provider)


    const name = await wethContract.name()

    console.log('-----------')

    console.log('contract name:', name) // expecting 'wrapped ether'

    console.log('-----------')



    const transaction = await wethContract.connect(connectedWallet).approve(
        curveAddress,

        parseUnits('0.01', 18).toString()

    )

    const receipt = await transaction.wait()


    console.log('---------')



    console.log('receipt block number:', receipt.blockNumber)


    console.log('------')


    const res = await axios.get(url)

    const curvePoolAbi = JSON.parse(res.data.result)

    const curveContract = new ethers.Contract(curveAddress, curvePoolAbi, provider)

    const owner = await curveContract.connect(connectedWallet).owner({

        gasLimit: ethers.utils.hexlify(1000000)

    })

    const fee = await curveContract.connect(connectedWallet).fee({

        gasLimit: ethers.utils.hexlify(1000000)

    })

    console.log('------------ -')

    console.log('owner address:', owner)

    console.log('fee:', fee)

    console.log('----------------- ')

}
main()
