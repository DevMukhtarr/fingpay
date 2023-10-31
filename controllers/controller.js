import Web3 from "web3";
import jwt from "jsonwebtoken";
import "dotenv/config";
const web3 = new Web3('https://rpc.sepolia.org/');

const privateKey = '264911a6fe288981cdf18567468ed66f985322919c3055e5ad45754cb974353e';
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
        console.log("hi")
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured" + error
            })
    }
}