import React, { useState, useEffect } from "react";

import { factoryAddress, factoryAbi } from "../../constants";
import Link from "next/link";
import { Table, Button, Loading } from "@nextui-org/react";
import { ethers, Contract } from "ethers";
import { useFactory } from "../../context/CampaignFactory";

const RegistrationLogs = () => {
  const { ethereum } = window;
  const { validateProtocolOf } = useFactory();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new Contract(factoryAddress, factoryAbi, provider);
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredLogs = contract.filters.registeredProtocol(null, null, false);

  const authorize = async (address) => {
    await validateProtocolOf(address);
    setLoading(false);
  };

  useEffect(() => {
    async function call() {
      const latestBlock = provider.getBlockNumber();
      const logs = await contract.queryFilter(
        filteredLogs,
        32282275,
        latestBlock
      );
      console.log("logs", logs);
      setLog(logs);
      setLoading(true);
    }
    call();
  }, [loading]);

  return (
    <div>
      <Table
        aria-label="Example static collection table"
        title="unverfied applications table"
        css={{
          height: "auto",
          minWidth: "100%",
          padding: "$11",
          backgroundColor: "Lavender",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column>Applicant's Address</Table.Column>
          <Table.Column>Protocol Link</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>

        {log == undefined && loading == false ? (
          <Loading type="points" size="xl" />
        ) : (
          <Table.Body>
            {log.map((e, index) => (
              <Table.Row key={index}>
                <Table.Cell>{e.args.client}</Table.Cell>
                <Table.Cell>
                  <Link href={e.args.url} passHref legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      Preview
                    </a>
                  </Link>
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
                <Table.Cell>
                  <Button
                    onPress={() => {
                      authorize(e.args.client);
                    }}
                    color="success"
                    rounded
                  >
                    Authorize
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
    </div>
  );
};

export default RegistrationLogs;
