import { useContract, useProvider, useSigner } from "wagmi";
import { campaignAbi, factoryAbi, factoryAddress } from "../constants";

/**
 * @description applied for both custom hook
 * @param {*} isSigner by default false
 * @dev isSigner = true ---> provider
 * @returns contract instance with type of obj: signer or provider
 */

export const getFactoryContract = (isSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  try {
    const contract = useContract({
      address: factoryAddress,
      abi: factoryAbi,
      signerOrProvider: isSigner ? signer : provider,
    });

    return contract;
  } catch (e) {
    console.log("unable to create contract instance", e);
  }
};

export const getCampaignContract = (isSigner = false, deployedAddress) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  try {
    const contract = useContract({
      address: deployedAddress,
      abi: campaignAbi,
      signerOrProvider: isSigner ? signer : provider,
    });

    return contract;
  } catch (e) {
    console.log("unable to create campaign contract instance", e);
  }
};
