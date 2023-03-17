import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Link from "next/link";
import { Table, Loading } from "@nextui-org/react";
import styles from "./History.module.css";
import { ethers, Contract } from "ethers";
import { factoryAddress, factoryAbi } from "../../../constants";
import { useFactory } from "../../../context/CampaignFactory";
import { useAccount } from "wagmi";

const History = () => {
  const { ethereum } = window;
  const { address } = useAccount();
  const { protocolsOf } = useFactory();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new Contract(factoryAddress, factoryAbi, provider);
  const [campaignLog, setClog] = useState([]);
  const [RegLog, setRlog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function call() {
      const latestBlock = provider.getBlockNumber();

      const filter = contract.filters.createdTender(
        address,
        null,
        null,
        null,
        null
      );

      const filter2 = contract.filters.registeredProtocol(
        null,
        address,
        null,
        null
      );
      const logs = await contract.queryFilter(
        filter,
        latestBlock - 32527903,
        latestBlock
      );
      const logs2 = await contract.queryFilter(
        filter2,
        latestBlock - 32527903,
        latestBlock
      );

      setClog(logs);
      setRlog(logs2);
      setLoading(true);
    }
    call();
  }, [loading]);
  return (
    <>
      <Navbar />
      <h1 className={styles.heading}>Application Status</h1>

      <div className={styles.table}>
        <h2> Application History</h2>
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            width: "100%",
          }}
          shadow={true}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>APPLICATION NUMBER</Table.Column>
            <Table.Column>APPLICATION</Table.Column>
            <Table.Column>REGISTERED DATE</Table.Column>
          </Table.Header>

          {RegLog == undefined && loading == false ? (
            <Loading type="points" size="xl" />
          ) : (
            <Table.Body>
              {RegLog.map((e, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{e.args.regNumber.toString()}</Table.Cell>
                  <Table.Cell>
                    <a href={e.args.pdf} target="_blank">
                      VIEW
                    </a>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(
                      parseInt(e.args.registeredTime * 1000)
                    ).toString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </div>

      <div className={styles.table}>
        <h2>Deployed Campaign</h2>
        <Table
          aria-label="Example table"
          css={{
            height: "auto",
            width: "100%",
            background: "$blue100",
          }}
          selectionMode="single"
          shadow={true}
        >
          <Table.Header>
            <Table.Column>CATEGORY</Table.Column>
            <Table.Column>CONTRACT ADDRESS</Table.Column>

            <Table.Column>CREATED TIME</Table.Column>
          </Table.Header>

          <Table.Body>
            {campaignLog == undefined && loading == false ? (
              <Loading type="points" size="xl" />
            ) : (
              campaignLog.map((e, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{e.args.category.toString()}</Table.Cell>

                  <Table.Cell>
                    <Link href={`/campaigns/${e.args.deployedTender}`}>
                      {e.args.deployedTender}
                    </Link>
                    {console.log("deployedTender", e.args.deployedTender)}
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(parseInt(e.args.createTime * 1000)).toString()}
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default History;
