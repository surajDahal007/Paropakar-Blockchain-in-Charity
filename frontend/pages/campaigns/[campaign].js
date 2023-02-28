import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import styles from "./campaign.module.css";
import { Table, Button } from "@nextui-org/react";
import Link from "next/link";
import { useCampaign } from "../../context/CampaignContext";
import { useRouter } from "next/router";
import { utils } from "ethers";

const campaign = () => {
  const router = useRouter();
  const { query } = router;
  const { campaign } = query;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(campaign);

  const { getTenderInfo } = useCampaign();

  useEffect(() => {
    async function getDetails() {
      console.log(await getTenderInfo(`${campaign}`));
      setDetails(await getTenderInfo(`${campaign}`));
      setLoading(true);
    }
    getDetails();
  }, [campaign]);

  return (
    <div className={styles.main}>
      <Navbar />

      {/* CAMPAIGN NAVBAR  */}

      <div className={styles.navbar}>
        <span>
          <Link href="#">
            <Button
              color="primary"
              css={{
                marginTop: "10px",
                fontSize: "18px",
              }}
              auto
              ghost
            >
              Campaign detail
            </Button>
          </Link>
        </span>

        <span>
          <Link href="#">
            <Button
              color="primary"
              css={{
                marginTop: "10px",
                fontSize: "18px",
              }}
              auto
              ghost
            >
              Campaign RequestLog
            </Button>
          </Link>
        </span>
      </div>

      <br />

      <div className={styles.center}>
        {(details && campaign) != undefined && loading ? (
          <>
            <h1 className={styles.heading}>Campaign Details</h1>

            <div className={styles.sidediv}>
              <Image src="/qr.png" height={400} width={600} alt="qr"></Image>
            </div>

            <hr className={styles.line} />
            <br />

            <div className={styles.detail}>
              <font className={styles.font}>Contract Address : {campaign}</font>

              <br />
              <br />

              <h3>Verified</h3>

              <div className={styles.image}>
                <Image
                  src={"/bluetick.png"}
                  height={30}
                  width={30}
                  quality={100}
                  alt={"logo"}
                  priority
                ></Image>

                <span className={styles.target}>
                  TARGET AMOUNT: {utils.formatEther(`${details[3]}`)} MATIC
                </span>
              </div>

              <br />
              <font className={styles.font}>
                Deadline : {Date(parseFloat(details[4].toString()))}
                <br />
                Category :
                <br />
                PDF : <a href={details[2]}>View Protocol</a>
              </font>
              <br />
              <br />
              <form>
                <input type="number" placeholder="Amount"></input>
                <br />
                <br />
                <Button shadow color="primary" auto>
                  Donate
                </Button>
              </form>
            </div>
          </>
        ) : (
          <p>loading......</p>
        )}
        <br />

        <div className={styles.donationlog}>
          <h3>MY DONORS</h3>
          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            bordered
            shadow={true}
          >
            <Table.Header>
              <Table.Column>ADDRESS</Table.Column>
              <Table.Column>DATE</Table.Column>
              <Table.Column>AMOUNT</Table.Column>
            </Table.Header>

            <Table.Body>
              <Table.Row key="1">
                <Table.Cell>
                  0x7e4ADc615016A2474cEAAC83345D3650Fb2EF8Fc
                </Table.Cell>
                <Table.Cell>Tue Feb 28 2023 14:39:41</Table.Cell>
                <Table.Cell>0.00234 MATIC</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <br />
      </div>
      <br />
    </div>
  );
};

export default campaign;
