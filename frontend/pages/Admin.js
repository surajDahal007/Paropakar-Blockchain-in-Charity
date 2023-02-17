import Image from "next/Image";
import { Web3Button } from "@web3modal/react";
import styles from "../styles/Admin.module.css";
import { getFactoryContract } from "../hooks/useContract";


const Admin = () => {
    const FactoryContract = getFactoryContract();


    async function getAuthorizer() {
        try {
          {
            const role = await FactoryContract.admin();
            const role2= await FactoryContract.AUTHORIZER_ROLE();
            // const role3= await FactoryContract.getYourRole();
            console.log(`Admin :- ${role}`);
            console.log(`Authorizer :- ${role2}`);
            let x= document.getElementById("authorizer");
            x.innerText=role2;
            // console.log(role3);

          }
        } catch(error) {
          console.log(error);
        }
      }


    const grantRole =  ()=>{
        var x= document.getElementById("addressGrant");
        // console.log(x.value.length);
        try{
        if(x.value.length <=0){
            console.log("No address given")
            alert("No address given");
        }
        else{
            let text=`Do you want to make ${x.value} account an Authorizer ?`;
            if(confirm(text)==true){
                alert(`Authorizer Grant request send`);
                // let x1= await FactoryContract.grantAuthorityRole(x);
                // console.log(`${x1}`);
            } else{
                alert(`Authorizer Grant request denied`);
            }
        }
    }catch(error){
        console.log(error);

    }}

    const revokeRole = ()=>{
        var x= document.getElementById("addressRevoke");
        console.log(x.value.length);
        if(x.value.length <=0){
            console.log("No address given")
            alert("No address given");
        }
        else{
            let text=`Do you want to remove ${x.value} account an Authorizer ?`;
            if(confirm(text)==true){
                alert(`Authorizer Revoke request send`);
            } else{
                alert(`Authorizer Revoke request denied`);
            }
        }
    }

  return (
    <>
     <div className={styles.navbar}>
            <div style={{
                marginLeft:"-12%"
            }} > 
                <Image src={"/navBarLogo.png"} 
                height={200} 
                width={400} 
                quality={100} 
                alt={"logo"}
                priority
                ></Image>
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
            <div id="authorizer">
    <button onClick={getAuthorizer}>CONSOLE</button>
            </div>
            <hr />

            <b>GRANT ROLE </b>  &nbsp; <br />
            <form>
                <input type={"text"} className={styles.input} id="addressGrant" placeholder={"Address"}></input>
                <br />
                <button className={styles.button} onClick={grantRole}>SUBMIT</button> &nbsp;
                <input type="reset" className={styles.reset}></input>
            </form>
            <hr />

            <b>REVOKE ROLE </b> <br /> 
            <form>
                <input type={"text"} className={styles.input} id="addressRevoke" placeholder={"Address"}></input>
                <br />
                <button className={styles.button} onClick={revokeRole}>SUBMIT</button> &nbsp;
                <input type="reset" className={styles.reset}></input>

            </form>
        </div>

    </>
  )
}

export default Admin