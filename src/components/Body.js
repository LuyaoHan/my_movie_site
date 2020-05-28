import React, { Component } from 'react'
import Home from './Home'
import Videos from './Videos'
import Projects from './Projects'

import MovieGallery from './MovieGallery'
import AddMovie from './AddMovie'
import CreateList from './CreateList'


export class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        console.log("Body.js: activeTab is",this.props.activeTab);
        if(activeTab === 1)
            return <MovieGallery/>
        else if(activeTab === 2)
            return <AddMovie/>
        else if(activeTab === 3)
            return <CreateList/>
        else 
        return <MovieGallery/>
    }
    render() {
        return (this.displayContent());

    }
}

export default Body;



