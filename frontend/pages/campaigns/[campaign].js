import React from "react";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import styles from "./campaign.module.css";
import { Table, Button} from '@nextui-org/react';
import Link from "next/link";

const campaign = () => {

  return (
    <div className={styles.main}>
      <Navbar />
      
      {/* CAMPAIGN NAVBAR  */}

    <div className={styles.navbar}>

        <span>
          <Link href="#">
          <Button color="primary" css={{
            marginTop:"10px",
            fontSize:"18px"
          }}
          auto 
          ghost>
          Campaign detail
          </Button>
          </Link> 
        </span> 

        <span>
        <Link href="#">
          <Button 
            color="primary"
            css={{
              marginTop:"10px",
              fontSize:"18px"
            }}
            auto 
            ghost>
          Campaign RequestLog
          </Button>
          </Link> 
        </span>
    </div>

    <br />

      <div className={styles.center}>
        <h1 className={styles.heading}>Campaign Details</h1>

        <div className={styles.sidediv}>
          <h3>Side Div </h3>
        </div>

        <hr className={styles.line}/>
        <br />

        <div className={styles.detail}>
          <font className={styles.font}>
            Contract Address :
          </font> 

          <br /><br />

          <h3>BIRSIYO</h3>
        
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
                TARGET AMOUNT: XXX MATIC
              </span>
          </div>

           <br />
           <font className={styles.font}>
              Created : // date {/* Date */}
              <br />
              Category : {/* Category */}
              <br />
              PDF : {/*IPFS review link */}
           </font>
           <br />
           <br />
           <form>
            <input 
              type="number" 
              placeholder="// Minimum Contribution"
              ></input>
              <br />
              <br />
              <Button shadow color="primary" auto>
                 Donate
              </Button>
           </form>
        </div>

        <br />

        <div className={styles.donationlog}>
            <h3>MY DONORS</h3>
            <Table
              aria-label="Example table with dynamic content"
              css={{
                height: "auto",
                minWidth: "80%"
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
          <Table.Cell>0x00...</Table.Cell>
          <Table.Cell>//date</Table.Cell>
          <Table.Cell>0 MATIC</Table.Cell>
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
