import Navbar from "./Navbar/Navbar";
import styles from "../styles/User.module.css";

const User = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.heading}>
          USER GUIDELINES
        </h1>
        <br />
      </div>
    </>
  )
}

export default User
