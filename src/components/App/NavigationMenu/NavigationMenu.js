import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Campaign from '../../Campaign/Campaign';
import OnboardingButton from './OnboardingButton/OnboardingButton';
import TabPanel from './TabPanel/TabPanel';

function NavigationMenu () {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };  
    const data = [
      {
        id: "1",
        title: "Uniswap Trade",
        shortDescription:
          "Trade 10 Uniswap tokens for the first time to earn UNI rewards!",
        subtitle: "",
        reward: "5 UNI",
        longDescription: `### Perform these steps to earn your reward!  \n1. Click the Enroll button below.  \n2. Navigate to [Uniswap's trading site.](https://app.uniswap.org/#/swap)  \n3. Trade 10 Uniswap  \n4. Come back here and click Verify.  \n5. You should see your reward in minutes!`,
      },

      {
        id: "2",
        title: "Compound Investments",
        shortDescription:
          "Put 50 COMP in a compound liquidity pool for 3 months and earn COMP rewards!",
        subtitle: "",
        reward: "50 COMP",
        longDescription: `### Perform these steps to earn your reward!  \n1. Click the Enroll button below.  \n2. Navigate to [Compound's trading site.](https://app.compound.finance/)  \n3. Do some other stuff.  \n4. Come back here and click Verify.  \n5. You should recieve your reward in 3 months!`,
      },
    ];
    const campaigns = data.map((campaign) => {
      return <Campaign campaign={campaign}></Campaign>;
    });

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Crypo Rewards
            </Typography>
            <OnboardingButton color="inherit">Connect Wallet</OnboardingButton>
          </Toolbar>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Campaigns" {...a11yProps(0)} />
            <Tab label="Resume" {...a11yProps(1)} />
            <Tab label="Create Campaign" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <div className="body">{campaigns}</div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Resume Page
        </TabPanel>
        <TabPanel value={value} index={2}>
          Create Campaign Page
        </TabPanel>
      </>
    );

}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
    }
  }));

export default NavigationMenu;