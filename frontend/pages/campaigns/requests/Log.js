import React, { useState, useEffect } from "react";
import { Table, Collapse, Button } from "@nextui-org/react";
import { useCampaign } from "../../../context/CampaignContext";
import { useAccount } from "wagmi";

const Log = ({ campaignAddress, owner }) => {
  const { address } = useAccount();
  console.log("address", address, "owner", owner);

  const { getRequestStatus, voteRequestToCampaign } = useCampaign();

  const [log, setLog] = useState([]);

  useEffect(() => {
    async function call() {
      console.log(
        "campaign data",
        await getRequestStatus(`${campaignAddress}`)
      );
      // setLog(await getRequestStatus(`${campaignAddress}`));
    }
    call();
  }, []);

  return (
    <>
      <div>
        <Collapse
          title="Payment Request State Log"
          css={{
            marginTop: "3%",
            marginRight: "2%",
            background: "$blue100",
          }}
          bordered
          expanded
        >
          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              width: "80%",
              margin: "4%",
              background: "$white100",
            }}
            shadow={true}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>Request NO.</Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column>Recipient</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Donors/Voters</Table.Column>
              <Table.Column>Complete Status</Table.Column>
              <Table.Column>Action</Table.Column>
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>else</Table.Cell>
                <Table.Cell>factoryAbi</Table.Cell>
                <Table.Cell>a</Table.Cell>
                <Table.Cell>b</Table.Cell>
                <Table.Cell>else</Table.Cell>
                <Table.Cell>factoryAbi</Table.Cell>
                <Table.Cell>
                  <Button auto color="primary" rounded>
                    Vote
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {address === owner && (
                    <Button auto color="success" rounded>
                      Settle Request
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Collapse>
        {/* <h2 style={{ marginLeft:"5%",marginBottom:"-2%"}}>Activity Log</h2> */}
      </div>
    </>
  );
};

export default Log;
