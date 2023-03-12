import { createContext, useContext } from "react";

import { getFactoryContract } from "../hooks/useContract";

//external imports
import { useAccount, useProvider, useSigner } from "wagmi";
import Swal from "sweetalert2";

const factoryContext = createContext();
export const useFactory = () => {
  return useContext(factoryContext);
};

export const FactoryProvider = ({ children }) => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const signerContract = getFactoryContract(signer);
  const providerContract = getFactoryContract(provider);

  const grantRole = (account) => {
    signerContract.grantAuthorityRole(account).then(async (tx) => {
      tx.wait(1).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully granted the role !",
          showConfirmButton: false,
          timer: 2500,
        });
      });
    });
  };

  const revokeRole = (account) => {
    signerContract.revokeAuthorityRole(account).then(async (tx) => {
      tx.wait(1).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully revoked the role !",
          showConfirmButton: false,
          timer: 2500,
        });
      });
    });
  };

  const registerYourProtocol = async ({
    deadline,
    target,
    category,
    pdf,
    minContribution,
  }) => {
    //check the input format
    try {
      console.log("inside context", category);
    } catch (e) {}
  };

  const getDeployedCampaignsAddress = async () => {
    try {
      const addresses = await providerContract.getDeployedTenders();
      console.log("address", addresses);
      return addresses;
    } catch (e) {
      alert("unable to get deployed campaigns");
    }
  };

  /**
   *
   * @param {@} client  address of the campaign verification request applicants
   */
  const validateProtocolOf = (client) => {
    try {
      signerContract.validateProtocol(client).then(async (tx) => {
        tx.wait(1).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Authorized!",
            showConfirmButton: false,
            timer: 2500,
          });
        });
      });
    } catch (e) {
      console.error(e);
      alert("Unable to validate!");
    }
  };

  const getAuthorizers = async () => {
    try {
      const authorizers = await providerContract.getCurrentAuthorizers();

      return authorizers;
    } catch (e) {}
  };

  return (
    <factoryContext.Provider
      value={{
        grantRole,
        revokeRole,
        getAuthorizers,
        validateProtocolOf,
        getDeployedCampaignsAddress,
        registerYourProtocol,
      }}
    >
      {children}
    </factoryContext.Provider>
  );
};
