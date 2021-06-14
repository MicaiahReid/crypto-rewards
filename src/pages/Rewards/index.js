import React, { useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import CustomTableRow from "./components/custom-table-row";
import { useSelector } from "react-redux";
import {
  getAccountAddress,
  getCampaigns,
} from "../../services/redux/selectors";
import NoWalletPlaceholder from "../components/no-wallet-placeholder";

const Rewards = () => {
  const accountAddress = useSelector(getAccountAddress);
  const campaigns = useSelector(getCampaigns);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    headerCell: {
      color: `${`rgba(133, 135, 168, 1)`}`,
      fontSize: 26,
      weight: 700,
    },
  });

  const renderHeader = useCallback(() => {
    return (
      <TableRow
        style={{
          backgroundColor: `${`rgba(89, 93, 149, 0.04)`}`,
        }}
      >
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          {"PROTOCOL"}
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          {"CHALLENGE"}
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          {"REWARD"}
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          {"STATUS"}
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        ></TableCell>
      </TableRow>
    );
  }, []);

  const filteredCampaigns = useMemo(
    () =>
      campaigns.filter(
        (campaign) =>
          campaign.status === "claimed" || campaign.status === "enrolled"
      ),
    [campaigns]
  );

  const renderPlaceholder = useCallback(() => {
    return (
      <NoWalletPlaceholder
        placeholder={"Go check out the challenges to earn rewards!"}
        accountAddress={accountAddress}
      />
    );
  }, [accountAddress]);

  return (
    <TableContainer component={Box}>
      <Table className={useStyles.table} aria-label="simple table">
        <TableHead>{renderHeader()}</TableHead>
        {filteredCampaigns.length > 0 ? (
          <TableBody>
            {filteredCampaigns.map((campaign) => {
              return <CustomTableRow key={campaign._id} campaign={campaign} />;
            })}
          </TableBody>
        ) : null}
      </Table>
      {filteredCampaigns.length > 0 ? null : renderPlaceholder()}
    </TableContainer>
  );
};

export default Rewards;
