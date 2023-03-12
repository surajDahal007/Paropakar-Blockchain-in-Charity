import React from "react";
import { Table,Collapse } from '@nextui-org/react';


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
      }
    ];
    const rows = [
      {
        key: "1",
        date: "Tony Reichert",
        account: "CEO",
        user: "Active",
        amount:"0 Matic"
      },
      {
        key: "2",
        date: "Tony Reichert",
        account: "CEO",
        user: "Active",
        amount:"0 Matic"
      },
      {
        key: "3",
        date: "Tony Reichert",
        account: "CEO",
        user: "Active",
        amount:"0 Matic"
      },
      {
        key: "4",
        date: "Tony Reichert",
        account: "CEO",
        user: "Active",
        amount:"0 Matic"
      },
    ];

  return( 
    <>
    
      <div>
      <Collapse title="Activity Log"
        css={{
          margin:"50px",
          background:'$blue100'
      }}
      bordered
      expanded
      >

      <Table
        aria-label="Example table with dynamic content"
        css={{
          height: "auto",
          width: "80%",
          margin:"4%",
          background: '$white100'
        }}
        shadow={true}
        selectionMode="single"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      
  
        </Collapse>
      {/* <h2 style={{ marginLeft:"5%",marginBottom:"-2%"}}>Activity Log</h2> */}
      
      </div>
    </>
  )
};

export default Log;
