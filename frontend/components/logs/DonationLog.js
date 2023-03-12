import React, { useState, useEffect } from "react";

import { campaignAbi } from "../../constants";
import Link from "next/link";
import { Table, Button, Loading, Input } from "@nextui-org/react";
import { ethers, Contract, utils } from "ethers";
import { useFactory } from "../../context/CampaignFactory";

const DonationLog = ({ campaignAddress }) => {
  console.log("camoiagnAddress", campaignAddress);
  const { ethereum } = window;
  const { validateProtocolOf } = useFactory();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new Contract(campaignAddress, campaignAbi, provider);
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function call() {
      const latestBlock = provider.getBlockNumber();
      const logs = await contract.queryFilter(
        "donorEvent",
        latestBlock - 32527903,
        latestBlock
      );
      console.log("logs", logs);
      setLog(logs);
      setLoading(true);
    }
    call();
  }, [loading]);

  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <Input clearable label="Search" type="search" placeholder="By Address" />
      <br />
      <br />
      <Table
        aria-label="Example static collection table"
        title="Donation Log Table"
        css={{
          height: "auto",
          minWidth: "100%",
          padding: "$11",
          backgroundColor: "Lavender",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column>Donor Address</Table.Column>
          <Table.Column>Amount</Table.Column>
          <Table.Column>Time</Table.Column>
        </Table.Header>
        <Table.Body>
          {log == undefined && loading == false ? (
            <Loading type="points" size="xl" />
          ) : (
            log.map((e, index) => (
              <Table.Row key={index}>
                <Table.Cell>{e.args.donor}</Table.Cell>

                <Table.Cell>
                  {utils.formatEther(e.args.amount)} MATIC
                </Table.Cell>
                <Table.Cell>
                  {new Date(parseInt(e.args.time * 1000)).toString()}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DonationLog;
