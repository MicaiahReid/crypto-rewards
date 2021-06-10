import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Campaign from './Campaign';

class Protocol extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          campaigns: props.campaigns
        }
      }


    render() {
        const campaigns = this.props.campaigns
        return(
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="stretch" spacing={3}>
                    {campaigns.map((campaign) => (
                        <Grid key={campaign.id} item xs={12} sm={4}>
                            <Box>
                                <Campaign key={campaign.id} campaign={campaign}></Campaign>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    }
}

export default Protocol;




