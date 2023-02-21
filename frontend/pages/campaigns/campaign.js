import Navbar from "../Navbar/Navbar";
import AllCampaign from "./[AllCampaign]";
// import Link from "next/Link";

const campaign = () => {
  return (
    <div>
      <Navbar />
        <h1>Campaign page</h1>
        <AllCampaign />
    </div>
  )
};

export default campaign;
