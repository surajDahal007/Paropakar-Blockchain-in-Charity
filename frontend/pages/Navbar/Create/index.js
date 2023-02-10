import React from "react";
import Navbar from "../Navbar"
import styles from "./Create.module.css";
// import { PdfUpload } from 'react-ipfs-uploader';


const Create = () => {
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
          {/* style={{
            width:"250px",
            height:"20px"
            }} */}

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
          <button className={styles.create}>Create Tender</button>
        </form>
      </div>
    </div>
  )
}

export default Create
