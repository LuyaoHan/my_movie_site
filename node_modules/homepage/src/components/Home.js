import React, { Component } from 'react'
import "../App.css"
export default class Home extends Component {
    componentDidMount(){
        document.title="www.luyao-han.online"     //define page name
      }
    render() {
        const titleSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#f0932b',
            backgroundRepeat: 'repeat-y',
            height: '20vh',
			position: 'relative'
        }

        const introSectionStyle={
            height:'100vh',
            width: '70vw',
            position: 'relative',
            padding: '30px'
        }

        const subSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#f0932b',
			backgroundRepeat: 'repeat-y',
            position: 'relative',
            height: '75vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Raleway, sans-serif',
            fontStyle: '32px', 
            textTransform: 'uppercase',
            letterSpacing: '8px'
        }

        const bodyStyle={
			margin: '0',
			padding: '0',
			backgroundColor: '#f0932b',
			backgroundRepeat: 'repeat-y',
			position: 'relative'
        }

        
        const homeTitleStyle={
            fontFamily: 'Monoton,cursive',
            fontSize: '5vw',
            position: 'relative',
            top: '1vw', 
            left: '1vw', 
            color: 'white',
        }


        return (
            <html>
                <section style={titleSectionStyle}>
		            <font style={homeTitleStyle} >
			            Welcome to my website 
		            </font>
                </section>
                
            </html>
	
        )
    }
}
