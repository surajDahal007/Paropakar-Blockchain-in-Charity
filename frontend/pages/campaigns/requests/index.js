import React from "react";
import Log from "./Log";
import { Card,Button } from '@nextui-org/react';
import styles from "./index.module.css"


const index = () => {

  function handleClick(){
    alert("clicked");
  } 

  return(
    <div>
      <h1 className={styles.heading}>Campaign RequestLog</h1>
      <br />
        <Card css={{ 
          mw: "400px",
          marginLeft:"40%",
          padding:"2%",
          fontWeight:"bold" 
          }}>
        <form>
            <label>DESCRIPTION:</label> 
            <br />
            <input type="text" placeholder='DESCRIPTION'></input>
            <br />
            <br />
            <label> AMOUNT: </label>
            <br />
            <input type="number" placeholder='MATIC'></input>
            <br />
            <br />
            <label>RECEPIENT:</label>
            <br />
            <input type="text" placeholder='payable address'></input>
            <br />
            <br />
            <input type="reset" class="reset"></input>
            <br />
            <br />
            <Button onClick={handleClick}>CREATE REQUEST</Button>
          </form>
      </Card>
      <br />
    
      <Log />
    </div>
  )
};

export default index;
