import React from 'react'
import Navbar from '../Navbar'
import { Table } from '@nextui-org/react';
import styles from "./History.module.css"

const History = () => {
  return (
    <>
      <Navbar />
      <h1 className={styles.heading}>Your History</h1>

      <div className={styles.table}>
        <h2>As Beneficiary</h2>
          <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            width:"100%"
          }}
          shadow={true}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>CATEGORY</Table.Column>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>TARGET</Table.Column>
            <Table.Column>DEADLINE</Table.Column>
            <Table.Column>PDF</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>Tony Reichert</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>

            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>

            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
              <Table.Cell>Senior Developer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>
    </div>

    <div className={styles.table}>
      <h2>As Donor</h2>
      <Table
          aria-label="Example table"
          css={{
            height: "auto",
            width:"100%",
            background: '$blue100'
          }}
          selectionMode="single"
          shadow={true}
        >
          <Table.Header>
            <Table.Column>CATEGORY</Table.Column>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>TARGET</Table.Column>
            <Table.Column>DEADLINE</Table.Column>
            <Table.Column>PDF</Table.Column>
          </Table.Header>
          
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>Tony Reichert</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
              <Table.Cell>Senior Developer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>William Howard</Table.Cell>
              <Table.Cell>Community Manager</Table.Cell>
              <Table.Cell>Vacation</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </div>
   

    </>
  )
}

export default History
