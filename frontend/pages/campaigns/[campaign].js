import React from "react";
// import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import styles from "./campaign.module.css";
import { Card, Text, Button,Input } from "@nextui-org/react";

const campaign = () => {

  // To handle donation button
  const handleClick = ()=>{
    alert("Donation button clicked")
  }

  return (
    <>
      <Navbar />
      
        <h1 className={styles.heading}> CAMPAIGN DETAILS</h1>
      <div className={styles.main}>

      <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>
          <b>CATEGORY : </b> 
          
        </Text>
      </Card.Body>
    </Card>
    <br />

    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>
        <b>TITLE : </b>
        </Text>
      </Card.Body>
    </Card>
    <br />


    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>
        <b> TARGET (ETH) : </b> 
        </Text>
      </Card.Body>
    </Card>
    <br />


    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>
        <b> MINIMUM CONTRIBUTION (ETH) : </b> 
        </Text>
      </Card.Body>
    </Card>
    <br />


    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>
        <b> DEADLINE : </b>
        </Text>
      </Card.Body>
    </Card>
    <br />


    <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Text>
        <b>  PDF : </b> 
        </Text>
      </Card.Body>
    </Card>

      <br />
      <b>DONATION AMOUNT (ETH)</b>
      <br />
      <br />
      <Input
        clearable
        underlined
        labelPlaceholder=""
        size="xLarge"
        //Put Minimum contribution as initial value
        initialValue="AMOUNT(ETH)" 
      />
      <br />
      <br />
    <Button shadow color="primary" auto rounded onClick={handleClick}>
          DONATE
      </Button>

    </div>

      <br />
      <br />

    </>
  );
};

export default campaign;
