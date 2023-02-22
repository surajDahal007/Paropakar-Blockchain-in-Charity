import Image from "next/image";
import { Web3Button } from "@web3modal/react";
import { useRef, useState, useEffect } from "react";
import styles from "../styles/Admin.module.css";
import { useFactory } from "../context/CampaignFactory";
import {
  Button,
  Input,
  Spacer,
  Text,
  Table,
  Grid,
  Loading,
} from "@nextui-org/react";

const Admin = () => {
  const { grantRole, revokeRole, getAuthorizers } = useFactory();
  const inputRef = useRef();

  //array form
  const [authorizers, setAuthorizers] = useState([]);
  const [reRender, setRender] = useState(false);

  async function grantRoleFor() {
    try {
      await grantRole(inputRef.current.value);
      setRender(true);
    } catch {
      alert("unable to grant the role");
    }
  }

  async function revokeRoleFor() {
    try {
      await revokeRole(inputRef.current.value);
      setRender(true);
    } catch {
      alert("unable to grant the role");
    }
  }

  useEffect(() => {
    async function read() {
      setAuthorizers(await getAuthorizers());
    }
    read();
  }, [reRender]);

  return (
    <>
      <div className={styles.navbar}>
        <div
          style={{
            marginLeft: "-12%",
          }}
        >
          <Image
            src={"/navBarLogo.png"}
            height={200}
            width={400}
            quality={100}
            alt={"logo"}
            priority
          ></Image>
        </div>

        <font className={styles.heading}>ADMIN PAGE</font>

        <div className={styles.option}>
          <Web3Button />
        </div>
      </div>

      <div
        style={{
          padding: "30px",
          fontSize: "24px",
        }}
      >
        <Grid.Container
          gap={2}
          css={{
            backgroundColor: "AliceBlue",
            padding: "$20",
          }}
          justify="space-around"
        >
          <Grid>
            <Text b>ROLE ACCESS CONTROL</Text>
            <Spacer y="0.5" />
            <Input
              rounded
              bordered
              label="Account Address"
              placeholder="0x00...."
              color="secondary"
              ref={inputRef}
            />

            <br />

            <Button.Group color="gradient" ghost size="xl">
              <Button onPress={grantRoleFor}>Grant</Button>
              <Button onPress={revokeRoleFor}>Revoke</Button>
            </Button.Group>
          </Grid>

          <Grid sm={6}>
            <Table
              title="Current Authorizers In The System"
              bordered
              shadow
              color="secondary"
              aria-label="Example pagination  table"
              css={{
                height: "auto",
                width: "stretch",
              }}
            >
              <Table.Header>
                <Table.Column>Address</Table.Column>
              </Table.Header>

              {authorizers != undefined ? (
                <Table.Body>
                  {authorizers.map((acc, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {acc != "0x0000000000000000000000000000000000000000" &&
                          acc}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              ) : (
                <Loading type="points" />
              )}

              <Table.Pagination
                shadow
                align="center"
                rowsPerPage={3}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Grid>
        </Grid.Container>
      </div>
    </>
  );
};

export default Admin;
