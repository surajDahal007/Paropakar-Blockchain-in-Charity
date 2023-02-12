import Image from "next/Image";
import { Web3Button } from "@web3modal/react";
import styles from "../styles/Admin.module.css";

const Admin = () => {

    const grantRole = ()=>{
        var x= document.getElementById("address");
        console.log(x.value.length);
        if(x.value.length <=0){
            console.log("No address given")
            alert("No address given");
        }
        else{
            let text=`Do you want to make ${x.value} account an Authorizer ?`;
            if(confirm(text)==true){
                alert(`Authorizer confirmed`);
            } else{
                alert(`Authorizer denied`);
            }
        }
    }

  return (
    <>
     <div className={styles.navbar}>
            <div style={{
                marginLeft:"-12%"
            }} > 
                <Image src={"/navBarLogo.png"} height={200} width={400} quality={100} alt={"logo"}></Image>
            </div>

            <font className={styles.heading}>
                ADMIN PAGE
            </font> 

            <div className={styles.option}>
                <Web3Button />
            </div> 
     </div>

        <div style={{
            padding:"30px",
            fontSize:"24px"
        }}>
            <h4>ABOUT AUTHORIZER </h4>
            <hr />

            <b>GRANT ROLE </b>  &nbsp; <br />
                <input type={"text"} className={styles.input} id="address" placeholder={"Address"}></input>
                <br />
                <button className={styles.button} onClick={grantRole}>SUBMIT</button>
            <hr />

            <b>REVOKE ROLE </b> <br /> 
            <input type={"text"} className={styles.input} placeholder={"Address"}></input>
            <br />
                <button className={styles.button}>SUBMIT</button>
        </div>

    </>
  )
}

export default Admin