import { createContext, useContext } from "react";
import { useProvider, useSigner, useContract } from "wagmi";
import { campaignAbi } from "../constants";
import { Contract, utils } from "ethers";

const campaignContext = createContext();
export const useCampaign = () => {
  return useContext(campaignContext);
};

const generateContract = async (address, obj) => {
  const contract = new Contract(address, campaignAbi, obj);
  return contract;
};

export const CampaignProvider = ({ children }) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const getTenderInfo = async (address) => {
    try {
      const contract = await generateContract(address, provider);
      console.log("contract", contract);
      const obj = await contract.readTenderStatus();
      return obj;
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * @argument {*}contract --> instance of particular campaign contract
   * {@returns} balance of contract -> bignumber object
   */
  const getContractBalance = async (contract) => {
    const balance = await contract.getContractBalance();
    return utils.formaEther(balance);
  };

  //-----function to donate the campaign

  const donateToCampaign = async (contract, amount) => {
    try {
      const fund = utils.parseEther(`${amount}`);
      await contract.donate({ value: fund });
    } catch {
      alert("unable to donate");
    }
  };

  const refund = async (contract) => {
    try {
      await contract.refund();
    } catch {
      alert("you weren't the donor of this campaign");
    }
  };

  const createRequestToCampaign = async (
    contract,
    description,
    recipient = address,
    amount
  ) => {
    try {
      const payment = utils.parseEther(`${amount}`);
      await contract.createRequest(description, recipient, payment);
    } catch {
      alert("unable to create you request");
    }
  };

  const voteRequestToCampaign = async (contract, reqNum) => {
    try {
      await contract.voteRequest(reqNum);
    } catch {
      alert("unable to vote");
    }
  };

  const getRequestStatus = async (contract, reqNum) => {};

  return (
    <campaignContext.Provider value={{ getTenderInfo }}>
      {children}
    </campaignContext.Provider>
  );
};
