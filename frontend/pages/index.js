import styles from "../styles/Index.module.css";
import Head from "next/head";
import { Web3Button } from "@web3modal/react";
import logo from "../public/logo.png";
import Image from "next/image";

//frontend\styles\Index.module.css

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>paropakar.com</title>
      </Head>
      <div className={styles.div1}>
        <Image src={logo} alt="logo" width={500} height={650} />
      </div>
      <div className={styles.div2}>
        <Web3Button />
        <div>
          <h1>Welcome!</h1>
        </div>
      </div>
    </div>
  );
}
