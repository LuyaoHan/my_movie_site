import React, { Component } from 'react'

export default class Tab extends Component {
    //specify rules by adding functions
    addStyling = () => {
        if(this.props.tab.id === this.props.activeTab){
            return {
                backgroundColor: 'Navy',
                color: '#6e7fc9'
            }    //specifying styling in function
        }else   {
            return {
                backgroundColor: 'white'
            }
        }
    }

    render() {
        return (
            <div className="Tab"
            style={this.addStyling()}
                onClick={this.props.changeTab.bind(this,this.props.tab.id)}>
            <font className='each-tab'>
            {this.props.tab.title}  
			</font>       
            <h1></h1>
            </div>
        )
    }
}
