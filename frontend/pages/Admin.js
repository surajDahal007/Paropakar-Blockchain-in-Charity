import Image from "next/image";
import { Web3Button } from "@web3modal/react";
import { useRef } from "react";
import styles from "../styles/Admin.module.css";
import { useFactory } from "../context/CampaignFactory";
import { Button, Input, Spacer, Text, Table, Grid } from "@nextui-org/react";

const Admin = () => {
  console.log("useFactory", useFactory());
  const { grantRole, revokeRole } = useFactory();
  const inputRef = useRef();

  async function grantRoleFor() {
    try {
      await grantRole(inputRef.current.value);
    } catch {
      alert("unable to grant the role");
    }
  }

  async function revokeRoleFor() {
    try {
      await revokeRole(inputRef.current.value);
    } catch {
      alert("unable to grant the role");
    }
  }

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
              bordered
              shadow={false}
              color="secondary"
              aria-label="Example pagination  table"
              css={{
                height: "auto",
                width: "stretch",
              }}
            >
              <Table.Header>
                <Table.Column>Address</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Status</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>Tony Reichert</Table.Cell>
                  <Table.Cell>CEO</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                  <Table.Cell>Zoey Lang</Table.Cell>
                  <Table.Cell>Technical Lead</Table.Cell>
                  <Table.Cell>Paused</Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                  <Table.Cell>Jane Fisher</Table.Cell>
                  <Table.Cell>Senior Developer</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row key="4">
                  <Table.Cell>William Howard</Table.Cell>
                  <Table.Cell>Community Manager</Table.Cell>
                  <Table.Cell>Vacation</Table.Cell>
                </Table.Row>
                <Table.Row key="5">
                  <Table.Cell>Jane Fisher</Table.Cell>
                  <Table.Cell>Senior Developer</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row key="6">
                  <Table.Cell>Zoey Lang</Table.Cell>
                  <Table.Cell>Technical Lead</Table.Cell>
                  <Table.Cell>Paused</Table.Cell>
                </Table.Row>
                <Table.Row key="7">
                  <Table.Cell>Jane Fisher</Table.Cell>
                  <Table.Cell>Senior Developer</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row key="8">
                  <Table.Cell>William Howard</Table.Cell>
                  <Table.Cell>Community Manager</Table.Cell>
                  <Table.Cell>Vacation</Table.Cell>
                </Table.Row>
              </Table.Body>
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
