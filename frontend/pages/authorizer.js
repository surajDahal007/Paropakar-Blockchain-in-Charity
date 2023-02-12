import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import styles from "../styles/Authorizer.module.css";
import Link from "next/Link";

const Authorizer = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div style={{
          marginLeft:"-5%"
        }}>
              <Image src={"/navBarLogo.png"} height={200} width={400} quality={100} alt={"image"} ></Image>
        </div>
        
           <font className={styles.heading}> 
              AUTHORIZER
           </font>

           <div className={styles.option} > 
               <Link href="/Admin" style={{textDecoration:"none"}} >
               All Contracts
                </Link>
            </div>

           <div className={styles.option}>
              <Link href="/Admin" style={{textDecoration:"none"}}>
                About Admin
              </Link>
            </div>
            <div className={styles.option}>
              <Web3Button />
             </div> 
          </div>

      <div className={styles.body}>
        <h1 className={styles.bodyHead}>
          PENDING REQUEST
        </h1>
      </div>
    </>
    )
}

export default Authorizer




