import styles from "./Navbar.module.css"
import Wallet from "../modal/Wallet";
import Link from "next/link";

const Navbar = () => {
  return( 
    <div className={styles.main}>
      <Link href="/" className={styles.link}>
        <font style={{fontFamily:"Monaco"}}> Paropakar </font> : <i> Blockchain in Charity </i>
      </Link>  
      <Wallet />
      
    </div>
  )
};

export default Navbar;
