import React, { useState } from "react";
import Navbar from "../Navbar";
import styles from "./Create.module.css";
import { useRef } from "react";
import { Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";

const Create = () => {
  const inputRef = useRef();
  const [pdf, setPdf] = useState(null);
  const [url, setUrl] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const uploadToIpfs = async () => {
    try {
      //create an object that can be used to construct a multipart/form-data request body that includes the PDF file data and any other parameters required by the Pinata API.
      const formData = new FormData();
      formData.append("file", pdf);

      //pinata API endpoint for uploading File
      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

      const resFile = await axios.post(url, formData, {
        headers: {
          pinata_api_key: `${process.env.NEXT_PUBLIC_REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.NEXT_PUBLIC_REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const pdfUrl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      setUrl(pdfUrl);
      setUploaded(true);
    } catch (e) {
      console.error(e);
      alert("Error! while uploading file to IPFS....");
    }
  };

  const ExternalLink = ({ href, children }) => (
    <Link href={href} passHref legacyBehavior>
      <a target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  );

  const validation = ()=>{

    var title = document.reg_form.title;
    var target = document.reg_form.target;
    var contribution= document.reg_form.mcontribution;
    var deadline= document.reg_form.deadline;
    var file = document.reg_form.file;

    if(title.value.length <=0){
      alert("title is required");
      title.focus();
      return false;
    }

    if(target.value.length <=0){
      alert("Target is required");
      target.focus();
      return false;
    }

    if(contribution.value.length <=0 ){
      alert("Minimum Contribution is required");
      contribution.focus();
      return false;
    }

    if(deadline.value.length <=0 ){
      alert("Deadline is required");
      deadline.focus();
      return false;
    }

    if(file.value.length <=0 ){
      alert("PDF is required");
      file.focus();
      return false;
    }
  }

  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <h2>Campaign Registration Form</h2>

        <form name="reg_form" onsubmit={validation}>
          <label>CATEGORY*</label>
          <br />

            <select id="category" name="category" className={styles.box}>
                <option value="miscellaneous">Miscellaneous</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Sports">Sports</option>
                <option value="Community support">Community support</option>
                <option value="Woman">Woman</option>
            </select>

            <br />
            <br />

          <label>TITLE*</label>
          <br />
          <input
            type="text"
            placeholder="ABOUT DONATION"
            className={styles.box}
            name="title"
          ></input>
          <br />
          <br />
          <label>Target(ETH)*</label>
          <br />
          <input
            type="number"
            placeholder="AMOUNT (ETH)"
            className={styles.box}
            name="target"
          ></input>
          <br />
          <br />
          <label>Minimum Contribution(ETH)*</label>
          <br />
          <input
            type="number"
            placeholder="(ETH)"
            className={styles.box}
            name="mcontribution"
          ></input>
          <br />
          <br />
          <label>Deadline*</label>
          <br />
          <input 
            type="date" 
            className={styles.box} 
            name="deadline"></input>
          <br />
          <br />
          PDF UPLOAD*
          <br />
          <input
            type="file"
            accept=".pdf"
            name="file"
            onChange={(e) => {
              setPdf(e.target.files[0]);
            }}
          ></input>
          
          <br />
          <br />
          {uploaded ? (
            <ExternalLink href={url}>
              <p b>Preview</p>
            </ExternalLink>
          ) : (
            <Button auto onPress={uploadToIpfs} rounded>
              Upload PDF
            </Button>
          )}
          <br />

          <Button shadow auto color="success" onClick={validation}>
            Register
          </Button>
          <br />
        </form>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Create;
