import styles from "../styles/Navbar.module.css";
import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import Link from "next/Link";

const Navbar = () => {
  return (
      <div className={styles.main}>
        <Image src={"/navBarLogo.png"} height={200} width={305} quality={100}></Image>
        
        <font className={styles.heading}>
          <i>
            WELCOME USER
          </i>
        </font>
        
          
              <Link href={"/"} className={styles.options}>CREATE</Link>
              <Link href={"/"} className={styles.options}>DonationLogs</Link>
              <Link href={"/"} className={styles.options}>RequestLogs</Link>
              <Link href={"/"} className={styles.options}>AUTHORIZERS</Link>
              <Link href={"/"} className={styles.options}>ADMIN</Link>
        <div className={styles.button}><Web3Button /></div>
      </div>
  
  )
}

export default Navbar
