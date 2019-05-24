import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class SideComponent extends Component {
    
    goTo(route) {
        this.props.history.push(route);
        this.props.drawerStatusFunction();
    }

    render() {
        return (
            <div>
                <h2 className="title">El Baratón</h2>
                <List component="nav">
                    <ListItem button onClick={() => { this.goTo('/orders') }}>
                        <ListItemText primary="My orders" />
                    </ListItem>
                    <ListItem button onClick={() => { this.goTo('/pos') }}>
                        <ListItemText primary="Pos" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withRouter(SideComponent);