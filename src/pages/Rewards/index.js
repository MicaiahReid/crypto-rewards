import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import RoundButton from "../components/round-button";

const Achievements = (campaigns) => {
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

  const handleRowClick = () => {
    console.log("Test");
  };

  const renderHeader = useCallback(() => {
    return (
      <TableRow style={{ backgroundColor: `${`rgba(89, 93, 149, 0.04)`}` }}>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          PROTOCOL
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          CHALLENGE
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          REWARD
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          STATUS
        </TableCell>
        <TableCell
          style={{
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontSize: 20,
            fontWeight: "bold",
          }}
        ></TableCell>
      </TableRow>
    );
  }, []);

  const renderRow = useCallback((row) => {
    console.log(row);
    return (
      <TableRow key={row._id} onClick={handleRowClick}>
        <TableCell
          component="th"
          scope="row"
          style={{
            color: "black",
            fontSize: 20,
          }}
        >
          {row.protocol}
        </TableCell>
        <TableCell
          style={{
            color: "black",
            fontSize: 20,
          }}
        >
          {row.title}
        </TableCell>
        <TableCell
          style={{
            color: "black",
            fontSize: 20,
          }}
        >
          {row.reward}
        </TableCell>
        <TableCell
          style={{
            color: "black",
            fontSize: 20,
          }}
        >
          {<RoundButton style={{
            backgroundColor: `${`rgba(55, 215, 100, 1)`}`, 
            borderColor: `${`rgba(55, 215, 100, 1)`}`
            }}
        label="Claimed" />}
        </TableCell>
        <TableCell>
          <ChevronRightIcon style={{color: `${`rgba(175, 192, 216, 1)`}`}}/>
        </TableCell>
      </TableRow>
    );
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={useStyles.table} aria-label="simple table">
        <TableHead>{renderHeader()}</TableHead>
        <TableBody>
          {campaigns.campaigns.map((row) => {
            return renderRow(row);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Achievements;
