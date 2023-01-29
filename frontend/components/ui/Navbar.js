import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { Web3Button } from "@web3modal/react";
import bg from "../img/index";

const Navbar = () => {
  return (
    <div className={styles.navbar_container}>
      {/**apply css for logo as in left section of the navbar */}
      <span className={styles.navbar_logo}>
        <Link href="/">
          <Image src={bg} alt="navbarLogo.png" />
        </Link>
      </span>

      <ul className={styles.link_container}>
        <p>Campaigns</p>
        <p>Create</p>
        <p></p>
      </ul>

      <Web3Button className={styles.button} />
    </div>
  );
};

export default Navbar;
