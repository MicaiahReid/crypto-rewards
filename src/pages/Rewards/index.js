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
        headerCell: {
            color: `${`rgba(133, 135, 168, 1)`}`,
            fontSize: 26,
            weight: 700
        }
      });
      

    render() {
        const classes = this.useStyles;
        
        return (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow style={{backgroundColor: `${`rgba(89, 93, 149, 0.04)`}`}}>
                    <TableCell style={{color: `${`rgba(133, 135, 168, 1)`}`, fontSize: 20, fontWeight: 'bold' }}>PROTOCOL</TableCell>
                    <TableCell style={{color: `${`rgba(133, 135, 168, 1)`}`, fontSize: 20, fontWeight: 'bold' }}>CHALLENGE</TableCell>
                    <TableCell style={{color: `${`rgba(133, 135, 168, 1)`}`, fontSize: 20, fontWeight: 'bold' }}>REWARD</TableCell>
                    <TableCell style={{color: `${`rgba(133, 135, 168, 1)`}`, fontSize: 20, fontWeight: 'bold' }}>STATUS</TableCell>
                    <TableCell style={{color: `${`rgba(133, 135, 168, 1)`}`, fontSize: 20, fontWeight: 'bold' }}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.campaigns.map((row) => (
                    <TableRow key={row.title}>
                    <TableCell component="th" scope="row">
                        UniSwap
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.reward}</TableCell>
                    <TableCell>{<RoundButton label="Claimed"/>}</TableCell>
                    <TableCell>
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