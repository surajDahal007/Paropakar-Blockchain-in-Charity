import Navbar from "./Navbar/Navbar";
import styles from "../styles/User.module.css";



const User = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <font className={styles.heading} >USER GUIDELINES</font>
      </div>
    </>
  )
}

export default User
