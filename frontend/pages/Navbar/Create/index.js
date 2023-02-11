import React from "react";
import Navbar from "../Navbar"
import styles from "./Create.module.css";
// import { PdfUpload } from 'react-ipfs-uploader';


const Create = () => {

  const handleClick = ()=>{
    confirm("Are you sure to deploy your donation request ?");
    // if(confirm(text)==true){
    
    // }
  }

  return (
    <div>
      <Navbar />
      
      <div className={styles.main}>
      <h1>TENDER CREATION</h1>

        <form >
        <label>TITLE</label>
        <br />
          <input type="text" placeholder="ABOUT DONATION" className={styles.box} ></input>
          <br /><br />

        <label>Target(ETH)</label>
        <br />
          <input type="number" placeholder="AMOUNT (ETH) " className={styles.box} ></input>
          <br /><br />

        <label >Minimum Contribution(ETH)</label>
        <br />
          <input type="number" placeholder="(ETH)" className={styles.box} ></input>
          <br /><br />

        <label>Deadline</label>
        <br />
          <input type="date" className={styles.box}></input>
          <br /><br />

        PDF UPLOAD 
          <br />
          <input type="file" accept=".pdf"></input>
          <br /><br />
          <input type="reset" className={styles.reset}></input>
          <br /><br />
          <button className={styles.create} onClick={handleClick}>Create Tender</button>
          <br />
        </form>
        <br />
        <br />
      </div>
    </div>
  )
}

export default Create
