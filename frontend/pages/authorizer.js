import { Web3Button } from "@web3modal/react";


const authorizer = () => {
  return (
    <div style={{
        display:"flex"
    }}>
      <h1>hello from authorizer</h1>
      <div className="button">
        <Web3Button />
      </div>
    </div>
  )
}

export default authorizer
