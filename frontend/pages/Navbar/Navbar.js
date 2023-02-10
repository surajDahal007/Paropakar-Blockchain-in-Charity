import styles from "./Navbar.module.css";
<<<<<<< HEAD
import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.main}>
      <Image
        src={"/navBarLogo.png"}
        height={200}
        width={320}
        quality={100}
        alt={"logo"}
        priority
      ></Image>

      <font className={styles.heading}>
        <i>WELCOME USER</i>
      </font>

      <div className={styles.option}>
        <Link href={"/User"} style={{ textDecoration: "none" }}>
          User Guidelines
        </Link>
      </div>

      <div className={styles.option}>
        <Link
          href={"/Navbar/Create"}
          className={styles.option}
          style={{ textDecoration: "none" }}
        >
          CREATE
        </Link>
      </div>

      <div className={styles.option}>
        <Link
          href={"/Navbar/DonationLog"}
          className={styles.option}
          style={{ textDecoration: "none" }}
        >
          DONATE
        </Link>
      </div>

      <div className={styles.option}>
        <Link
          href={"/Navbar/RequestLog"}
          className={styles.option}
          style={{ textDecoration: "none" }}
        >
          RequestLogs
        </Link>
      </div>

      <div className={styles.button}>
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
=======
import { Web3Button } from '@web3modal/react';
import Image from "next/Image";
import Link from "next/Link";

const Navbar = () => {
  return (
      <div className={styles.main}>
        <Image src={"/navBarLogo.png"} height={200} width={320} quality={100} alt={'logo'} priority ></Image>
        
        <font className={styles.heading}>
          <i>
            WELCOME USER
          </i>
        </font>
        
          <div className={styles.option}>
              <Link 
                href={"/User"}
                style={{textDecoration:"none"}} 
                >User Guidelines</Link> 
          </div>

          <div className={styles.option}>
            <Link 
              href={"/Navbar/Create"} 
              className={styles.option}
              style={{textDecoration:"none"}}
              >CREATE</Link>   
          </div>  

          <div className={styles.option}>    
            <Link 
            href={"/Navbar/DonationLog"} 
            className={styles.option}
            style={{textDecoration:"none"}}
            >DONATE</Link>
          </div>

          <div className={styles.option}>
            <Link 
              href={"/Navbar/RequestLog"}
              className={styles.option}
              style={{textDecoration:"none"}}
             >RequestLogs</Link>
          </div>

          <div className={styles.button}>
            <Web3Button />
          </div>
      </div>
  
  )
}

export default Navbar
>>>>>>> 1ffd1275448c642ee85ba6b727f07418b49f0b62
