import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Link from "next/link";
import { Table, Loading } from "@nextui-org/react";
import styles from "./History.module.css";
import { ethers, Contract } from "ethers";
import { factoryAddress, factoryAbi } from "../../../constants";

const History = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new Contract(factoryAddress, factoryAbi, provider);
  const [campaignLog, setClog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function call() {
      const latestBlock = provider.getBlockNumber();
      const logs = await contract.queryFilter(
        "createdTender",
        latestBlock - 32527903,
        latestBlock
      );

      setClog(logs);
      setLoading(true);
    }
    call();
  }, [loading]);
  return (
    <>
      <Navbar />
      <h1 className={styles.heading}>Application Status</h1>

      <div className={styles.table}>
        <h2>Your Pending Applications</h2>
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
            <Table.Column>CATEGORY</Table.Column>
            <Table.Column>APPLICATION</Table.Column>
            <Table.Column>DATE</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>Tony Reichert</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>

            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>

            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
              <Table.Cell>Senior Developer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div className={styles.table}>
        <h2>Your Campaigns</h2>
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
            <Table.Column>TARGET</Table.Column>
            <Table.Column>CREATED TIME</Table.Column>
            <Table.Column>DEADLINE</Table.Column>
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
                    <Loading
                      type="spinner"
                      color="currentColor"
                      size="sm"
                      title="Pending"
                    />
                    Pending
                  </Table.Cell>
                  <Table.Cell>padding</Table.Cell>
                  <Table.Cell>padding</Table.Cell>
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
