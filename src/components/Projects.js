import React, { Component } from 'react'





export default class Images extends Component {
    componentDidMount(){
        document.title="www.luyao-han.online"     //define page name
      }
    render() {
       
        const contentSectionStyle={
            height:'300vh', 
            width: '100vw',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center', 
            position:'relative'
        }

        const subSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#6e7fc9',
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
			backgroundColor: '#6e7fc9',
			backgroundRepeat: 'repeat-y',
			position: 'relative'
        }

        
        const imageStyle={
            position: 'relative', 
            paddingTop:'20px', 
            paddingRight:'20px',
            top: '1vh', 
            left: '1vw', 
            width:'300px', 
            height:'200px',
            //zIndex:"1000"
        }

        const titleSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#6e7fc9',
            backgroundRepeat: 'repeat-y',
            height: '20vh',
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

        const projectTitleStyle={
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1vw',
            position: 'relative',
            top: '-3vw', 
            left: '5vw', 
            color: 'white',
        }


        return (
            <html>
                <section style={titleSectionStyle}>
		            <font style={homeTitleStyle} >
			            Images
		            </font>
                </section>
                
            </html>
	
        )
    }
}
