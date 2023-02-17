import styles from "./Navbar.module.css";
import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import Link from "next/Link";

const Navbar = () => {
  return (
      <div className={styles.main}>
        <Image src={"/navBarLogo.png"}
         height={200} 
         width={320} 
         quality={100}
         alt={'logo'}
         priority
         ></Image>
        <font className={styles.heading}>
          <i>
            WELCOME USER
          </i>
        </font>
        
          <div className={styles.option}>
              <Link 
                href={"/User"}
                style={{textDecoration:"none"}} 
                >USER GUIDELINES</Link> 
          </div>

          <div className={styles.option}>
            <Link 
              href={"/Navbar/Create/Create"} 
              
              style={{textDecoration:"none"}}
              >CREATE</Link>   
          </div>  

          <div className={styles.option}>    
            <Link 
            href={"/Navbar/DonationLog/Donate"} 
            style={{textDecoration:"none"}}
            >DONATE</Link>
          </div>

          <div className={styles.option}>
            <Link 
              href={"/Navbar/RequestLog"} 
              style={{textDecoration:"none"}}
             >REQUESTLOG</Link>
          </div>

          <div className={styles.button}>
            <Web3Button />
          </div>
      </div>
  
  )
}

export default Navbar
