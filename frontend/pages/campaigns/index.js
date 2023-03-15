import Navbar from "../Navbar/Navbar";
import { Card, Grid, Row, Text, Loading, Spacer } from "@nextui-org/react";
import { factoryAddress, factoryAbi } from "../../constants";
import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { useRouter } from "next/router";

const index = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new Contract(factoryAddress, factoryAbi, provider);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function call() {
      const latestBlock = provider.getBlockNumber();
      const logs = await contract.queryFilter(
        "createdTender",
        latestBlock - 33108125,
        latestBlock
      );
      setCampaigns(logs);
      console.log("logs", logs);
      setLoading(true);
    }
    call();
  }, [loading]);

  const [searchValue, setSearchValue] = useState("");

<<<<<<< HEAD
  const handleChange = (event) => {
    console.log(event.target.value);
=======
  const handleChange = (event)=>{
>>>>>>> a1cf51e8b86389f37261f83105bb42dcfbb5b10d
    setSearchValue(event.target.value);
  };

  // const filterCampaigns = campaigns.filter((campaign)=>{
  //   // console.log( campaign.args.category==searchValue);

  //   if(campaign.args.category==searchValue){
  //     console.log(campaign);
  //     return campaign;
  //   }
  //   else if(campaign.args.category==searchValue){
  //     return (campaign.args.category==searchValue);
  //   }
  // })

  const filterCampaigns = campaigns.filter((campaign)=>{
    console.log( campaign.args.category==searchValue);
    return campaign.args.category==searchValue;
  })


  return (
    <div>
      <Navbar />
      <h1
        style={{
          marginLeft: "45%"
        }}
      >
        Campaign page
      </h1>

      <br />
      <br />
      <div>
<<<<<<< HEAD
        <form
          style={{
            margin: "1%",
            fontWeight: "bold",
          }}
        >
          <label>Search By CATEGORY</label>
          <br />
          <input type="text" placeholder="CATEGORY" onChange={handleChange} />
          <br />
        </form>
      </div>
=======
          <form style={{
              margin:"1%",
              fontWeight:"bold",
            
            }}>
              {/* <label>Search By CATEGORY</label> */}
              <h2>SEARCH BY CATEGORY</h2>
                <input type="text" placeholder="CATEGORY" onChange={handleChange} style={{
                  width:"350px",
                  height:"40px",
                  fontSize:"18px",
                  fontWeight:"bold"
                }} />
                <br />
          </form>
        </div>
>>>>>>> a1cf51e8b86389f37261f83105bb42dcfbb5b10d

      {loading == false ? (
        <Loading
          loadingCss={{
            $$loadingSize: "100px",
            $$loadingBorder: "10px",
          }}
        />
      ) : (
        <Grid.Container gap={2} css={{ width: "70%" }} justify="flex-start">

        {/* For searching purpose only */}

          {filterCampaigns.map((item, index) => (
            <Grid 
              xs={8} 
              sm={6} 
              key={index}
              css={{
                marginBottom:"5%"
              }}
            >
              <Card
                isPressable
                isHoverable
                key={index}
                onPress={() => {
                  router.push({
                    pathname: "/campaigns/[campaign]",
                    query: { campaign: item.args.deployedTender },
                  });
                }}
              >
              
              <Card.Body css={{ p: 0, maxHeight: "20rem" }}>
                  <Card.Image
                    src={item.args.image}
                    objectFit="cover"
                    width="100%"
                    height={300}
                    alt="campaign"
                  />
              </Card.Body>

                <Card.Footer css={{ justifyContent: "flex-start" }}>
                  <div>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>CATEGORY</Text>
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                      &nbsp;
                        {item.args.category}
                      &nbsp;
                      </Text>
                    </Row>
                  </div>

                  <div>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>Created Time:</Text>
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        &nbsp;
                        {new Date(
                          parseInt(item.args.createTime * 1000)
                        ).toString()}
                      </Text>
                    </Row>
                  </div>
                </Card.Footer>    
              </Card>
            </Grid>
          ))}
    
         
          {/* To display all campaigns */}
          {/* let's try two in one */}
          
          {campaigns.map((item, index) => (   
            <Grid xs={7} sm={4} key={index}>
              <Card
                isPressable
                key={index}
                onPress={() => {
                  router.push({
                    pathname: "/campaigns/[campaign]",
                    query: { campaign: item.args.deployedTender },
                  });
                }}
              >
                <Card.Body css={{ p: 0, maxHeight: "20rem" }}>
                  <Card.Image
                    src={item.args.image}
                    objectFit="cover"
                    width="100%"
                    height={800}
                    alt="campaign"
                  />
                </Card.Body>

                <Card.Footer css={{ justifyContent: "flex-start" }}>
                  <div>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>CATEGORY</Text>
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        {item.args.category}
                      </Text>
                    </Row>
                  </div>

                  <div>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>
                        <br />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        Created Time
                      </Text>
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                         &nbsp;
                        &nbsp;
                        &nbsp;
                        {new Date(
                          parseInt(item.args.createTime * 1000)
                        ).toString()}
                      </Text>
                    </Row>
                  </div>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}
    </div>
  );
};

export default index;
