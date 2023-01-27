import styles from "./Navbar.module.css";
import Link from "next/link";
import { Web3Button } from "@web3modal/react";

const Navbar = () => {
  return (
    <div>
      <Link href="/" className={styles.link}>
        <font style={{ fontFamily: "Monaco" }}> Paropakar </font> :{" "}
        <i> Blockchain in Charity </i>
      </Link>
      <div className={styles.connectButton}>
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
