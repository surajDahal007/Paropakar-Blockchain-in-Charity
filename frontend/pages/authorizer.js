
import { Navbar } from '@nextui-org/react';
import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import styles from "../styles/Authorizer.module.css";
import Link from "next/Link";

const Authorizer = () => {
  return (
    <>
      <div>
        <Navbar height={200}>
        <div style={{
                    marginLeft:"-15%"
                }}>
                    <Image src={"/navBarLogo.png"} height={200} width={400} quality={100} alt={"image "}></Image>
                </div>
                
            <font className={styles.heading}> Authorizer PAGE</font> 
            <Link href="/Admin">Verification Request</Link>
            <Link href="/Admin">About Admin</Link>
               <Web3Button /> 
            </Navbar>
      </div>

      <p style={{
            padding:"30px",
            fontSize:"30px"
        }}>
        ALL CONTRACTS
      </p>
  
    </>
      )
}

export default Authorizer




