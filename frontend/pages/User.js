import Navbar from "./Navbar/Navbar";
import styles from "../styles/User.module.css";
import Image from "next/image";

const User = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.heading}>USER GUIDELINES</h1>
      </div>

      <div className={styles.body}>
        <h2>
          How Paropakar works{" "}
          <big>
            <i>?</i>
          </big>
        </h2>

        <p>
          There are three participants in this system. <b>Admin </b>,{" "}
          <b>Authorizers</b> and common <b>Users</b> (Like YOU).
          <br />
          Their functions are as follows:- <br />
          <h3>1. ADMIN</h3>
          <p>
            <b>ADMIN</b> is the one who deployed the entire system. Admin
            assigns or revokes different accounts as authorizer. As it is a
            decentralized system, Admin cannot modify/delete the details
            donation or donation request. The identity of Admin is anonymous.
          </p>
          <h3>2. AUTHORIZERS</h3>
          <p>
            <b>AUTHORIZERS</b> are the accounts assigned by the Admin whose main
            task is to verify donation request. Only after verification of
            donation request by authorizer, it will be displayed to user for
            donation.
            <br />
            The identity of Authorizers are anonymous.
          </p>
          <h3>3. USERS</h3>
          <p>
            <b>User</b> are the one who use this system to either ask for
            donation or request donation from other users.
          </p>
        </p>
        <br />

        <h2>
          How to use it{" "}
          <big>
            <i>?</i>
          </big>
        </h2>
        <h3> 1. DONATION REQUEST</h3>
        <p>
          <Image
            src={"/tender.png"}
            height={700}
            width={1300}
            quality={100}
            className={styles.image}
          ></Image>
          <br />
          Donation request can be made by filling a form from <b>Create</b>{" "}
          option in Navbar. All the information must be filled.
        </p>
        <br />
      </div>
    </>
  );
};

export default User;
