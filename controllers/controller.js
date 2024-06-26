import Web3 from "web3";
import jwt from "jsonwebtoken";
import "dotenv/config";
const web3 = new Web3('https://rpc.sepolia.org/');

const privateKey = 'private_key';
const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
const gasLimit = web3.utils.toHex(24856); 
const gasPrice = web3.utils.toWei('20', 'gwei')

export const createToken = async (req, res) =>{
    try {
        const {name, authcode} = req.body;

        const token = jwt.sign(
            { name: name, authcode: authcode},
            process.env.JWT_TOKEN_KEY,
            {
              expiresIn: "365d",
            }
          );

          return res.status(200).json({
            status: false,
            message: "token creation successful",
            token: token
            })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured" + error
            })
    }
}

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

            return res.status(200).json({
                status: false,
                message: "sent to the blockchain successfully"
                })

    } catch (error) {
    return res.status(500).json({
        status: false,
        message: "An error occured" + error
        })
    }
}


export const sendFingerPrintDetails = async ( req, res ) =>{
    try {
        return res.status(200).json({
            status: true,
            message: "fingerprint details",
            data: {
                details: "https://sepolia.etherscan.io/tx/0x9d15b25b82c0141066a4e154318a6dc724a066d27698875e9277c6be7c1ab57d"
            }
            })  
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured" + error
            })
    }
}
