import React, { Component } from 'react'
import Tab from './Tab'
//active state in here is props. Props is used to pass information to child state 
export default class TabList extends Component {
    render() {
        return this.props.tabs.map((eachTab) => (//*Looping* over each tabs objects, and have them printed (by default vertically) on the screen
            <Tab tab={eachTab} activeTab={this.props.activeTab} changeTab={this.props.changeTab}/>   //in tabs.js it access the actual name by {this.props.tab.title}
        ));
    }
}
