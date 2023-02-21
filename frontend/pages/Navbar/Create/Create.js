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

  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <h1>Campaign Registration Form</h1>

        <form>
          <label>TITLE</label>
          <br />
          <input
            type="text"
            placeholder="ABOUT DONATION"
            className={styles.box}
          ></input>
          <br />
          <br />
          <label>Target(ETH)</label>
          <br />
          <input
            type="number"
            placeholder="AMOUNT (ETH) "
            className={styles.box}
          ></input>
          <br />
          <br />
          <label>Minimum Contribution(ETH)</label>
          <br />
          <input
            type="number"
            placeholder="(ETH)"
            className={styles.box}
          ></input>
          <br />
          <br />
          <label>Deadline</label>
          <br />
          <input type="date" className={styles.box}></input>
          <br />
          <br />
          PDF UPLOAD
          <br />
          <input
            type="file"
            accept=".pdf"
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
          <Button shadow auto color="success">
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
