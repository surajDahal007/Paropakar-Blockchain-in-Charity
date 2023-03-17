import React from "react";
import { Table, Collapse } from "@nextui-org/react";

const Log = () => {
  const columns = [
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "account",
      label: "ACCOUNT",
    },
    {
      key: "user",
      label: "USER",
    },
    {
      key: "amount",
      label: "AMOUNT",
    },
  ];

  return (
    <>
      <div>
        <Collapse
          title="Activity Log"
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
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>else</Table.Cell>
                <Table.Cell>factoryAbi</Table.Cell>
                <Table.Cell>a</Table.Cell>
                <Table.Cell>b</Table.Cell>
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
