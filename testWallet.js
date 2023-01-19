var lightwallet = require("eth-lightwallet");
var HookedWeb3Provider = require("hooked-web3-provider");
const Web3  = require("web3");
const async = require('async');
const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/c3a1bd84c4184c0893c97802c8dcbe09"));


var password = Math.random().toString(36).substring(2,10);
var seed = lightwallet.keystore.generateRandomSeed();
console.log(seed)
const numAddr = 1

function generateAddrs(password,seed,numAddr){
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: seed,
        hdPathString: "m/0'/0'/0'"
    }, function (err, ks) {

        ks.keyFromPassword(password, function (err, pwDerivedKey) {
            if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
                reject(new Error("Incorrect derived key!"));
            }

            try {
                ks.generateNewAddress(pwDerivedKey, numAddr);
            } catch (err) {
                console.log(err);
                console.trace();
            }
            var address = ks.getAddresses()[0];
            var returnAddress = ks.getAddresses()
            //console.log( ks.getAddresses())
            
            var prv_key = ks.exportPrivateKey(address, pwDerivedKey);

            //console.log('address and key: ', address, prv_key);
            resolve(returnAddress);
        });
    });
  });
}

generateAddrs(password, seed, numAddr)
  .then(returnAddress => {
      console.log(returnAddress)
      getBalances(returnAddress)
    })
  .catch(error => console.log(error));





function getBalances(addresses) {
  async.map(addresses, web3.eth.getBalance, function(err, balances) {
      if (err) {
          console.log(err);
          return;
      }
      async.map(addresses, web3.eth.getTransactionCount, function(err, nonces) {
          if (err) {
              console.log(err);
              return;
          }
          for (let i = 0; i < addresses.length; i++) {
              console.log(`This is the address ${addresses[i]} and it contains a balance in the amount of ${(balances[i] / 1.0e18)} and the ETH Nonce is: ${nonces[i]}`);
          }
      });
  });
}


function createNewWallet(){
  const randomSeed = lightwallet.keystore.generateRandomSeed();
  const passwordCreate = "password"
  console.log(randomSeed)

 
}

createNewWallet()

