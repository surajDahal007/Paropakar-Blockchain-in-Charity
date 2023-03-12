import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import styles from "./campaign.module.css";
import { Card, Row, Col, Button, Text, Loading } from "@nextui-org/react";
import Link from "next/link";
import { useCampaign } from "../../context/CampaignContext";
import DonationLog from "../../components/logs/DonationLog";
import { useRouter } from "next/router";
import { utils } from "ethers";
import requests from "./requests/index";

const campaign = () => {
  const router = useRouter();
  const { query } = router;
  const { campaign } = query;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();

  const [donorComp, setDonorComp] = useState(false);
  const [reqComp, setReqComp] = useState(false);

  const { getTenderInfo, donateToCampaign } = useCampaign();

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
              onPress={() => {
                setDonorComp(true);
                setReqComp(false);
              }}
            >
              Campaign Donation Log
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
              onPress={() => {
                setReqComp(true);
                setReqComp(false);
              }}
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
              <Card css={{ w: "100%", h: "500px" }}>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text
                      h5
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      Transfer From Your Mobile Wallet
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src="/bu.jpg"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt="Card example background"
                  />
                </Card.Body>
                <Card.Footer
                  isBlurred
                  css={{
                    position: "absolute",
                    bgBlur: "#ffffff66",
                    borderTop:
                      "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row>
                    <Col>
                      <Text color="#000" size={18}>
                        Available soon.
                      </Text>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        <Button flat auto rounded color="secondary">
                          <Text
                            css={{ color: "inherit" }}
                            size={12}
                            weight="bold"
                            transform="uppercase"
                          >
                            Notify Me
                          </Text>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </div>

            <hr className={styles.line} />
            <br />

            <div className={styles.detail}>
              <font className={styles.font}>Contract Address : {campaign}</font>
              <Text i css={{ color: "blue" }}>
                {" "}
                Authorizer: {details[0]}
              </Text>

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
                Refundable Status: {details[10].toString()}
                <br />
                Amount Raised : {utils.formatEther(details[6])} matic
                <br />
                Deadline : {new Date(parseInt(details[4] * 1000)).toString()}
                <br />
                Donors Count :{details[7].toString()}
                <br />
                No. of Requests: {details[8].toString()}
                <br />
                Application : <a href={details[2]}>View Protocol</a>
              </font>
              <br />
              <br />
              <form>
                <input
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                ></input>
                <br />
                <br />
                <Button
                  shadow
                  color="primary"
                  onPress={async () => {
                    console.log("amount", amount);
                    await donateToCampaign(campaign, amount);
                  }}
                  auto
                >
                  Donate
                </Button>
              </form>
            </div>
            <h3>Log section</h3>

            <div className={styles.log}>
              {donorComp && <DonationLog campaignAddress={campaign} />}
              {reqComp && <h1>realllyyyy</h1>}
            </div>
          </>
        ) : (
          <Loading
            loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
          />
        )}
      </div>
      <br />
    </div>
  );
};

export default campaign;
