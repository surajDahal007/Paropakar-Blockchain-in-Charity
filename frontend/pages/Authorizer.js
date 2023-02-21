import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import styles from "../styles/authorizer.module.css";
import Link from "next/link";

const Authorizer = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div
          style={{
            marginLeft: "-5%",
          }}
        >
          <Image
            src={"/navbarlogo.png"}
            height={200}
            width={400}
            quality={100}
            alt={"image"}
          ></Image>
        </div>

        <font className={styles.heading}>AUTHORIZER</font>

        <div className={styles.option}>
          <Link href="/Admin" style={{ textDecoration: "none" }}>
            All Contracts
          </Link>
        </div>

        <div className={styles.option}>
          <Link href="/Admin" style={{ textDecoration: "none" }}>
            About Admin
          </Link>
        </div>
        <div className={styles.option}>
          <Web3Button />
        </div>
      </div>

      <div className={styles.body}>
        <h1 className={styles.bodyHead}>PENDING REQUEST</h1>
      </div>
    </>
  );
};

export default Authorizer;
