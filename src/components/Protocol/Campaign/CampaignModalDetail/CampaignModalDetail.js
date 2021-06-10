import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';

class CampaignModalDetail extends React.Component {

    useStyles() {
        return makeStyles((theme) => ({
            root: {
                margin: 0,
                padding: theme.spacing(2),
              },
              closeButton: {
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(1),
                color: theme.palette.grey[500],
              },
            }));
      }

    render() {
        const classes = this.useStyles();
        return(
            <Dialog onClose={this.props.onClose} aria-labelledby="challenge-dialog-title" open={this.props.open}>
                    <MuiDialogTitle disableTypography dividers className={classes.root} id="customized-dialog-title">
                        <Grid justify="space-between" container spacing={24} >
                            <Typography variant="h6">{this.props.modalTitle}</Typography>

                            {this.props.onClose ? (
                                <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.onClose}>
                                <CloseIcon />
                                </IconButton>) : null}
                        </Grid>
                    </MuiDialogTitle>
                <DialogContent dividers >
                    <Typography gutterBottom>
                        To learn more about this protocol, visit: <Link href="https://uniswap.org/about/">About Uniswap</Link>
                    </Typography>

                    <Typography gutterBottom>
                        <ReactMarkdown>{this.props.modalDetails}</ReactMarkdown>
                    </Typography>
                </DialogContent>
            </Dialog>
        );
    }
}

export default CampaignModalDetail;