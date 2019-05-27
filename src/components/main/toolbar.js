import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

function AppBarComponent(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} onClick={props.drawerStatusFunction} color="inherit" aria-label="Menu">
          <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {'El Baratón React'}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBarComponent);