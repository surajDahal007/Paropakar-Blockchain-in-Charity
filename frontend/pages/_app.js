import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";




//import  navbar component here

import "../styles/globals.css";
// import { NextUIProvider } from '@nextui-org/react';

// const {address,isConnected} = useAccount();
<<<<<<< HEAD
=======

>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62

const chainSupport = [polygonMumbai];

// create wagmi client to configure chains to get connected
/**
 {@param} suppoted chains and provider node to be used
 {@returns} object
 {@description} destructure retirned object to get provider obj
 */
const { provider } = configureChains(chainSupport, [
  walletConnectProvider({ projectId: "1feab24f8df3e7c942161253e25657ce" }),
]);
const providers = provider(chainSupport);
console.log("providers", providers);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Paropakar", chainSupport }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chainSupport);




function MyApp({ Component, pageProps }) {
<<<<<<< HEAD
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const addressRef = useRef();
  const [rerender, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
    if (rerender) {
      router.push("/");
      setRender(false);
    }
  }, [address, isConnected]);
=======

  



>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62

  return (
    <>
    
      <WagmiConfig client={wagmiClient}>
<<<<<<< HEAD
        {/* <NextUIProvider> */}
=======
      {/* <NextUIProvider> */}
>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62
        <Component {...pageProps} />
      {/* </NextUIProvider> */}
      </WagmiConfig>
    

      <Web3Modal
        projectId="1feab24f8df3e7c942161253e25657ce"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default MyApp;
