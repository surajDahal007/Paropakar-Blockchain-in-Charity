
import { Navbar } from '@nextui-org/react';
import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import styles from "../styles/authorizer.module.css";
import Link from "next/Link";

const authorizer = () => {
  return (
    <>
      <div>
        <Navbar height={200}>
        <div style={{
                    marginLeft:"-15%"
                }}>
                    <Image src={"/navBarLogo.png"} height={200} width={400} quality={100}></Image>
                </div>
                
            <font className={styles.heading}> AUTHORIZER PAGE</font> 
            <Link href="/Admin">Verification Request</Link>
            <Link href="/Admin">About Admin</Link>
                <Web3Button /> 
            </Navbar>
      </div>

      <p style={{
            padding:"30px"
        }}>
        <h1>ALL CONTRACTS</h1>
      </p>
  
    </>
      )
}

export default authorizer




