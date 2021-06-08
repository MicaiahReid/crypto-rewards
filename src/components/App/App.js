import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Campaign from '../Campaign/Campaign';
import OnboardingButton from './OnboardingButton/OnboardingButton';

function App() {
  
  const classes = useStyles();

  return (
    <>
        <AppBar position="static">
          <Toolbar>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Crypto Rewards
            </Typography>

            <OnboardingButton color= "inherit">Connect Wallet</OnboardingButton>
          
          </Toolbar>

        </AppBar>

        <div>
          <Campaign> </Campaign>
        </div>
    </>
  );
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
  }
}));

export default App;
