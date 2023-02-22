import Navbar from "../Navbar/Navbar";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useFactory } from "../../context/CampaignFactory";
import { useCampaign } from "../../context/CampaignContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const { getDeployedCampaignsAddress } = useFactory();
  const { getTenderInfo } = useCampaign();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState();
  const [loading, setLoading] = useState(false);
  const [campaignsDatas, setDatas] = useState([{}]);

  const getCamapignsDatas = async () => {
    let details = [];
    const totalCampaigns = await campaigns;
    for (let i = 0; i < totalCampaigns.length; i++) {
      const datas = await getTenderInfo(totalCampaigns[i]);
      console.log("time", parseFloat(datas[4].toString()));
      details.push({
        address: totalCampaigns[i],
        image: datas[1],
        deadline: datas[4].toString(),
      });
    }
    console.log(details);
    setDatas(details);
  };

  useEffect(() => {
    async function getCampaigns() {
      setCampaigns(await getDeployedCampaignsAddress);
      setLoading(true);
    }
    getCampaigns();
  }, []);

  useEffect(() => {
    async function getCampaignsData() {
      if (campaigns != undefined) {
        await getCamapignsDatas();
      }
    }
    getCampaignsData();
  }, [campaigns]);

  return (
    <div>
      <Navbar />
      <h1>Campaign page</h1>
      {campaigns == undefined && loading == false ? (
        <p>No any campaigns been created yet ..........!</p>
      ) : (
        <Grid.Container gap={2} justify="flex-start">
          {campaignsDatas.map((item, index) => (
            <Grid xs={6} sm={3} key={index}>
              <Card
                isPressable
                key={index}
                onPress={() => {
                  router.push({
                    pathname: "/campaigns/[campaign]",
                    query: { campaign: item.address },
                  });
                }}
              >
                <Card.Body css={{ p: 0, maxHeight: "20rem" }}>
                  <Card.Image
                    src={item.image}
                    objectFit="cover"
                    width="100%"
                    height={300}
                    alt="campaign"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>uk</Text>
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      {Date(parseFloat(item.deadline))}
                    </Text>
                  </Row>
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
