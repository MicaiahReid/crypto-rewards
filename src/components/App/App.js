import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Campaign from '../Campaign/Campaign';

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
            <Button color="inherit">Connect Wallet</Button>
          </Toolbar>
        </AppBar>

        <div className="body">
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
  },
  body: {
    flexGrow: 1,
  },
}));

export default App;
