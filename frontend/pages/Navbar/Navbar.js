import styles from "./Navbar.module.css";
import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "@nextui-org/react";

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

      <div className={styles.trigger}>
        <Dropdown>
          <Dropdown.Button flat>Portal</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="new">Registration Form</Dropdown.Item>
            <Dropdown.Item key="copy">Your History</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className={styles.option}>
        <Link href={"/campaigns"} style={{ textDecoration: "none" }}>
          Campaigns
        </Link>
      </div>

      <div className={styles.button}>
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
