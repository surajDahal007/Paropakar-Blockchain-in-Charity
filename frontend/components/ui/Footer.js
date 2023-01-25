import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <div></div>
      <div></div>
      <div> 
            <h4 style={{
                marginLeft:"85%"
            }}>Recommendation</h4>
            <a className={styles.recommend}
            href="https://metamask.io/?utm_source=DappRadar&utm_medium=footer&utm_campaign=recommended" 
            target="_blank"
            >Metamask</a>
            <a className={styles.recommend}
            href="https://www.coinbase.com/wallet" 
            target="_blank">Coinbase</a>
            <a className={styles.recommend}
            href="https://www.itoken.com/en?utm_source=1602433" 
            target="_blank">Huobi Wallet</a>
        </div>
    </div>
  )
}

export default Footer
