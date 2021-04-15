import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {  JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import "antd/dist/antd.css";
import Web3Modal from "web3modal";
import "./App.css";
import "./Animation.css";
import { Header } from "./components";
import { Pixels } from "./views";
import { INFURA_ID, NETWORKS } from "./constants";
import { useUserProvider, useContractLoader, useEventListener } from "./hooks";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { Token, WETH, Fetcher, Route as URoute } from "@uniswap/sdk";

const targetNetwork = NETWORKS['localhost']; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

function App() {
  const [injectedProvider, setInjectedProvider] = useState();
  const [ soldPixels, setSoldPixels ] = useState()
  const [ ownPixels, setOwnPixels ] = useState()
  const [ mainnetProvider, setMainnetProvider ] = useState()
  const [ readProvider, setReadProvider ] = useState()
  const [ price, setPrice ] = useState(0)

  const userProvider = useUserProvider(injectedProvider)
  const address = useUserAddress(userProvider);
  const writeContract = useContractLoader(mainnetProvider)
  const readContract = useContractLoader(readProvider)

  useEffect(() => {
    const provider = targetNetwork.name === 'localhost' ? "https://rpc.scaffoldeth.io:48544" : targetNetwork.rpcUrl
    const mainnetProvider = new JsonRpcProvider(provider);
    const readProvider = targetNetwork.name === 'localhost' ? new JsonRpcProvider(targetNetwork.rpcUrl) : mainnetProvider;

    const fetchPrice = async () => {
      const DAI = new Token(
          mainnetProvider._network ? mainnetProvider._network.chainId : 1,
          "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          18,
      );
      const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
      const route = new URoute([pair], WETH[DAI.chainId]);
      const price = parseFloat(route.midPrice.toSignificant(6));
      setPrice(price)
    }
    fetchPrice()
    
    setMainnetProvider(mainnetProvider)
    setReadProvider(readProvider)
  }, [])

  useEffect(() => {
    console.log("sold pixels", soldPixels)
  }, [soldPixels])

  //const transferEvents = useEventListener(contract, "CryptoPixels", "Transfer", mainnetProvider, 1);
 // console.log("📟 Transfer events:",transferEvents)

  useEffect(()=>{
    const updateCryptoPixels = async () => {
      let ownPixels = []
      let soldPixels = await readContract.CryptoPixels.getSoldPixels()
      for(let i = 0; i < soldPixels.length; ++i){
        const owner = await readContract.CryptoPixels.ownerOf(soldPixels[i])
        if(address && owner === address){  
          ownPixels.push(soldPixels[i])
        }
      }
      setSoldPixels(soldPixels)
      setOwnPixels(ownPixels)
    }

    if(!soldPixels && readContract && readContract.CryptoPixels) updateCryptoPixels()
  }, [readContract, address]); //, transferEvents
  

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  return (
    <div className="App">
      <Header/>

      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Pixels
              soldPixels={soldPixels}
              ownPixels={ownPixels}
              targetNetwork={targetNetwork}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              writeContract={writeContract}
              readContract={readContract}
              price={price}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

 window.ethereum && window.ethereum.on('chainChanged', chainId => {
  setTimeout(() => {
    window.location.reload();
  }, 1);
})

export default App;
