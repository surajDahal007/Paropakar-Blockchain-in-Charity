import Navbar from "../Navbar"
import Link from "next/Link"
import styles from "./Donation.module.css"

const DonationLog = () => {
  return (
    <div>
      <Navbar />
      <h1 className={styles.heading}>DONATION PAGE</h1>
      <div className={styles.body}>
          <Link href="../../campaigns/campaign">campign here</Link>
      </div>
    </div>
  )
}

export default DonationLog
