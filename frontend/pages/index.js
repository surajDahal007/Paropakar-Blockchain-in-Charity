import styles from "../styles/Index.module.css";
import Head from "next/head";
import { Web3Button } from "@web3modal/react";
import logo from "../public/logo.png";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { getFactoryContract } from "../hooks/useContract";
import { useEffect } from "react";

<<<<<<< HEAD
=======

>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62
export default function Home() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const FactoryContract = getFactoryContract();

  async function getRole() {
    try {
      if (isConnected && address) {
        const role = await FactoryContract.roles(`${address}`);
<<<<<<< HEAD
        if (role == "authorizer") {
          router.push(`/Authorizer`);
        } else if (role == "admin") {
          router.push("/Admin");
        } else {
          router.push(`/User`);
        }
        // else home page display
        // } else{
        //   router.push("/");
      }
    } catch (error) {
=======
        if(role=="authorizer"){
          router.push(`/Authorizer`);
        }else if(role=="admin"){
            router.push(`/Admin`);
        } 
        else{
          router.push(`/User`);
        }
      }
    } catch(error) {
>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62
      // alert("Proceed to connecting your wallet....");
      console.log(error);
    }
  }

  useEffect(() => {
    getRole();

  }, [address, isConnected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>paropakar.com</title>
        <link rel="icon" href="/ico.svg" />
      </Head>
      <div className={styles.div1}>
        <Image src={logo} alt="logo" width={550} height={650} />
      </div>
      <div className={styles.div2}>
<<<<<<< HEAD
=======
     
>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62
        <div>
          <h1 className={styles.h1}>Welcome!</h1>
        </div>

        <div className={styles.button}>
          <Web3Button />
        </div>
      </div>
    </div>
  );
}
