import { useEffect, useState, createContext } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";

const campaignContext = createContext();
export const useCampaign = () => {
  return useContext(campaignContext);
};

export const campaignProvider = ({ children }) => {
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  //-----function to donate the campaign

  const donate = async () => {};
};
