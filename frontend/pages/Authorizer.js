import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import styles from "../styles/authorizer.module.css";
import RegistrationLogs from "../components/logs/RegistrationLogs";

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
          <Web3Button />
        </div>
      </div>

      <div className={styles.body}>
        <h1 className={styles.bodyHead}>Campaigns Verifications</h1>
      </div>
      <RegistrationLogs />
    </>
  );
};

export default Authorizer;
