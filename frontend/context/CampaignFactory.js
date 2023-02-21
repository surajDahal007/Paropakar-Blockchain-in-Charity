import { createContext, useContext } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { getFactoryContract } from "../hooks/useContract";
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

  const grantRole = async (account) => {
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

  const revokeRole = async (account) => {
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

  return (
    <factoryContext.Provider value={{ grantRole, revokeRole }}>
      {children}
    </factoryContext.Provider>
  );
};
