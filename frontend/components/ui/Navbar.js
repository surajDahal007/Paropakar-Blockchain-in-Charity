import styles from "./Navbar.module.css"
import Wallet from "../modal/Wallet";
import Link from "next/link";

const Navbar = () => {
  return( 
    <div className={styles.main}>
      <Link href="/" className={styles.link}>
          Paropakar : <i> Blockchain in Charity </i>
      </Link>  
      <Wallet />
      
    </div>
  )
};

export default Navbar;
