import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import './Layout.css';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    showSideDrawer = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    hideSideDrawer = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <SideDrawer show={this.state.showSideDrawer} closeSideDrawer={this.hideSideDrawer}/>
                <Toolbar clickToggle={this.showSideDrawer} />
                <main className="Content">
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;