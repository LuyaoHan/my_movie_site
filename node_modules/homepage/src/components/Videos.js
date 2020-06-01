import React, { Component } from 'react';


export default class Videos extends Component {
    componentDidMount(){
        document.title="www.luyao-han.online"     //define page name
      }
    render() {
        const contentSectionStyle={
            height:'120vh', 
            width: '100vw', 
            display: 'block', 
            alignItems: 'center',
            justifyContent: 'center', 
            position: 'relative',
            top:'5vh'
        }

        const subSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#7ed6df',
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
			backgroundColor: '#7ed6df',
			backgroundRepeat: 'repeat-y',
			position: 'relative'
        }


        const titleSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#7ed6df',
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

        const youtubeFrameStyle={
            position: "relative",
            width: '30vw',
            height: '30vh',
            margin: '2vw'
        }
        return (
            <html>
                <section style={titleSectionStyle}>
		            <font style={homeTitleStyle} >
			            Videos
		            </font>
                </section>
                <body style={bodyStyle}>
                    <section className="pictures-content" style={contentSectionStyle}>
                    <iframe style={youtubeFrameStyle} src={'https://www.youtube.com/embed/lnVGgiAaswA'} allowFullScreen/>
                    <iframe style={youtubeFrameStyle} src={'https://www.youtube.com/embed/Pr141CuQJmg'} allowFullScreen/>
                    <iframe style={youtubeFrameStyle} src={'https://www.youtube.com/embed/jO1bDcLARtQ'} allowFullScreen/>
                    <iframe style={youtubeFrameStyle} src={'https://www.youtube.com/embed/5fgy8iNH29A'} allowFullScreen/>    

                        </section>
                    <section style={subSectionStyle}>
                        Section 1	
                    </section>
                    <section style={subSectionStyle}>
                        Section 2	
                    </section>
                    <section style={subSectionStyle}>
                        Section 3	
                    </section>
                </body>
            </html>
	
        )
    }
}
