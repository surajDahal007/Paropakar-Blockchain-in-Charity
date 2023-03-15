import Navbar from "../Navbar/Navbar";
import { Card, Grid, Row, Text, Loading, Spacer } from "@nextui-org/react";
import { factoryAddress, factoryAbi } from "../../constants";
import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { useRouter } from "next/router";
import { AiFillFilter } from "react-icons/ai";

const index = () => {
  const provider =
    typeof window == "undefined"
      ? ethers.getDefaultProvider()
      : new ethers.providers.Web3Provider(window.ethereum);
  const contract = new Contract(factoryAddress, factoryAbi, provider);

  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [isSearch, setSearch] = useState(false);

  useEffect(() => {
    async function call() {
      const latestBlock = await provider.getBlockNumber();
      const logs = await contract.queryFilter(
        "createdTender",
        latestBlock - 33108125,
        latestBlock
      );
      setCampaigns(logs);
      console.log("logs", logs);
    }
    call();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <h1
        style={{
          marginLeft: "45%",
        }}
      >
        Campaign page
      </h1>

      <br />
      <br />
      <div>
        <form
          style={{
            margin: "1%",
            fontWeight: "bold",
          }}
        >
          <h2>SEARCH BY CATEGORY</h2>
          <input
            type="text"
            placeholder="CATEGORY"
            onChange={handleSearchChange}
            style={{
              width: "350px",
              height: "40px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          />

          <br />
        </form>
      </div>

      <Grid.Container gap={2} css={{ width: "70%" }} justify="flex-start">
        {campaigns
          .filter((campaign) =>
            isSearch ? campaign.args.category === isSearch : true
          )
          .map((item, index) => (
            <Grid
              xs={7}
              sm={4}
              key={index}
              css={{
                marginBottom: "5%",
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
      </Grid.Container>
    </div>
  );
};
export default index;
