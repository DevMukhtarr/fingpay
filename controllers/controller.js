import Web3 from "web3";
const web3 = new Web3('https://rpc.sepolia.org/');

const privateKey = process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
const gasLimit = web3.utils.toHex(24856); 
const gasPrice = web3.utils.toWei('20', 'gwei')

export const getFingerPrintDetails = async ( req, res ) => {
    try {
        const { details } = req.body

        const transaction = {
            from: account.address,
            to: '0x546CD3362a1385B78B976637845025DaE1fe498B',
            data: web3.utils.toHex(JSON.stringify(details)),
            gas: gasLimit,
            gasPrice: gasPrice
          };
          
          web3.eth.accounts.signTransaction(transaction, privateKey)
            .then(signedTx => {
              return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            })
            .then(receipt => {
              console.log('Transaction receipt:', receipt);
            })
            .catch(error => {
              console.error('Transaction error:', error);
            });
    } catch (error) {
    return res.status(500).json({
        status: false,
        message: "An error occured" + error
        })
    }
}


export const sendFingerPrintDetails = async ( req, res ) =>{
    try {
        console.log("hi")
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured" + error
            })
    }
}