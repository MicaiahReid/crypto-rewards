import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import RoundButton from "../components/round-button";

class Achievements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          campaigns: props.campaigns
        }
    }

    useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      

    render() {
        const classes = this.useStyles;
        
        return (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Protocol</TableCell>
                    <TableCell align="right">Challenge</TableCell>
                    <TableCell align="right">Reward</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.campaigns.map((row) => (
                    <TableRow key={row.title}>
                    <TableCell component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell align="right">{row.shortDescription}</TableCell>
                    <TableCell align="right">{row.reward}</TableCell>
                    <TableCell align="right">{<RoundButton label="Claimed"/>}</TableCell>
                    <TableCell align="right">
                        <Button>
                            <ChevronRightIcon></ChevronRightIcon>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        );
    }
}

export default Achievements;