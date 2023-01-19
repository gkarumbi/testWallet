const lightwallet = require("eth-lightwallet");
const HookedWeb3Provider = require("hooked-web3-provider");

const Web3 = require('web3')

const web3 = new Web3()
let global_keystore;
const password= "password"

function setWeb3Provider(keystore){
    const web3Provider = new HookedWeb3Provider({
        host:'https://rinkeby.infura.io/',
        transaction_signer:keystore
    });

    web3.setWeb3Provider(web3Provider)

}

function newAddresses(password){
    const numAddr = 5;
    global_keystore.keyFromPassword(password, function(err,pwDerivedKey){
        global_keystore.generateNewAddress(pwDerivedKey,numAddr);

        const addresses = global_keystore.getAddresses();
    })
}