import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import CustomTableRow from "./components/custom-table-row";

const Achievements = ({ campaigns }) => {
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
          PROTOCOL
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          CHALLENGE
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          REWARD
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontWeight: "800",
            fontSize: 13,
            fontFamily: "Poppins",
          }}
        >
          STATUS
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

  return (
    <TableContainer component={Box}>
      <Table className={useStyles.table} aria-label="simple table">
        <TableHead>{renderHeader()}</TableHead>
        <TableBody>
          {campaigns.map((campaign) => {
            if (campaign.status === "claimed" || campaign.status === "enrolled")
              return <CustomTableRow key={campaign._id} campaign={campaign} />;
            else return null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Achievements;
