import React, { Component } from 'react';
// import productService from '../../services/product.service';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class SideContentComponent extends Component {
    state = {
        categories: []
    }

    render() {
        return (
            <div>
                {/* {
                    categories.map((category, i) => (
                        <ExpansionPanel key={i} className="sideExpand">
                            <ExpansionPanelSummary>
                                <ExpandMoreIcon/>
                                <Typography className="">{category.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))
                } */}
            </div>
        );
    }
}

export default SideContentComponent;