import { Web3Button } from "@web3modal/react";
import styles from "../styles/authorizer.module.css";
//frontend\styles\authorizer.module.css

const authorizer = () => {
  return (
    <>
    <div className={styles.main}>

      <div className={styles.head}> 
        <h1 className={styles.heading}>AUTHORIZER PAGE</h1>
        <div className="connectButton">
          <Web3Button />
        </div>
      </div>

      
      <div>
        <h2>MANAGERS DETAILS</h2>
    
      </div>
      <hr />

      <div className={styles.grantRole}>
        <h2>GRANT ROLE</h2>
        <form>
          <input type="text" placeholder="ACCOUNT ADDRESS"></input>
          <br />
          <input type="submit" className="button"></input>
        </form>
      </div>
      <hr />

      <div className={styles.removeRole}>
        <h2>REMOVE ROLE</h2>
          <form>
          <input type="text" placeholder="ACCOUNT ADDRESS"></input>
            <br />
          <button className="button">Remove Manager</button>
          </form>
      </div>
      <br />
    </div>
    </>
  )
}

export default authorizer
