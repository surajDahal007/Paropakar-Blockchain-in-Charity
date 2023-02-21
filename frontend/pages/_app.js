import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";

//import  navbar component here

import "../styles/globals.css";
// import { NextUIProvider } from '@nextui-org/react';

// const {address,isConnected} = useAccount();

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

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Paropakar", chainSupport }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chainSupport);
console.log(ethereumClient);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    ethereumClient.watchAccount((acc) => {
      {
        router.push("/");
      }
    });
  }, []);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {/* <NextUIProvider> */}
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
