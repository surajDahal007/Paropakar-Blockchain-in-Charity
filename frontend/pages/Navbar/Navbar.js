import styles from "./Navbar.module.css";
import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import Link from "next/Link";

const Navbar = () => {
  return (
      <div className={styles.main}>
        <Image src={"/navBarLogo.png"} height={200} width={310} quality={100} alt={'logo'}></Image>
        
        <font className={styles.heading}>
          <i>
            WELCOME USER
          </i>
        </font>
              <Link href={"/User"} className={styles.option}>User Guidelines</Link>
              <Link href={"/Navbar/Create"} className={styles.option}>CREATE</Link>       
              <Link href={"/Navbar/DonationLog"} className={styles.option}>DonationLogs</Link>
              <Link href={"/Navbar/RequestLog"} className={styles.option}>RequestLogs</Link>
        <div className={styles.button}><Web3Button /></div>
      </div>
  
  )
}

export default Navbar
