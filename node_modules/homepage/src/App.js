import React, { Component } from 'react'
import TabList from './components/TabList'
import Body from './components/Body'

import "./App.css"
export class App extends Component {
    constructor(){
        super();
        this.state = {
            activeTab: 1   //home is by default the tab selected
        }

        this.changeTab = (id) =>{   //whenever is function is execute, send me back the id
            this.setState({
                activeTab: id        
            })
            console.log("App.js: id is %d",id)
        }
    }

    
    render() {
        //add the states, in this case the active tabs
        
        //define tabs in the nevigation bar
        const tablist = [
            {id: 1,title: 'Movies'},
            {id: 2,title: 'Add Movies'},
            {id: 3,title: 'Create List'},
        ]
        return ( 
            <div className="body" >
                <div className="nav-bar" >
                    <TabList tabs={tablist}  activeTab={this.state.activeTab}  changeTab={this.changeTab}/>      
                </div> 
                 <div className="main-body" >
                    <Body activeTab={this.state.activeTab}/>
                </div> 
            </div>
        )
    }
}
export default App;