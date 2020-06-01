import React, { useEffect, useState } from 'react'
import '../App.css'
import config from './config.js'
import useForm from './useForm'

import { Alert } from 'reactstrap';

/*
node node_modules/reac  t-scripts/scripts/start.js

Fix react page doesn't update on file change *WORKS*
sudo -i
echo 1048576 > /proc/sys/fs/inotify/max_user_watches
exit

*/
const firebase = require('firebase')

function AddMovie(){
  
    const [shouldRender , setShouldRender] = useState(true)
    

    let scrollRef = null; //used to refer scrollRef, so that on content change window is scrolled to bottom automaticallu


    const guestBookStyle={
       
        backgroundColor: '#eadedb',
        backgroundRepeat: 'repeat-y',
        position: 'relative',
        height: '80vh',
        width: '100%',
        display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontStyle: '2px', 
        //textTransform: 'uppercase',
        letterSpacing: '1px'
    }
    const formInputFontStyle={
      fontFamily: 'Raleway, sans-serif',
      fontStyle: '32px', 
      marginBottom: '20px',
    }

    const formInputDivStyle={
      position: 'relative',
      fontSize: '12px',
      left:'10vw',
      top: '8vh'
    }

    const formPrintDivStyle={
      position: 'absolute',
      left:'35vw',
      top: '8vh',
      width: '60vw',
      height: '60vh',
      border: 'dotted blue',
      borderWidth: '2px',
      borderColor: '#2a4944',
    }

    const formLabelFontStyle={
      fontFamily: 'lucida grande,arial',
      fontSize: '1vw',
      fontWeight: 'bold',
      color: '#2E4A62',
      position: 'relative',
      top: '0vw',
      left:'-1vw'
    }
   
    useEffect(() => {
      //console.log("shouldRender: " + shouldRender);
      if(!firebase.apps.length){
          firebase.initializeApp(config)
      }
    })

    
    const [data,setData] = useState([]);
        
    const [values,setValues] = useState({newMovieID:""}) 

    const handleTextChange = event =>{
      console.log(event.target.name,"new movie is:" + event.target.value)
      console.log("event.target.name is:" + event.target.name)
      setValues({    
        [event.target.name]: event.target.value, 
        });
        console.log("values.newMovieID" + values.newMovieID)
    };
     
    

    //Submission function
    const handleSubmit = event =>{  
      console.log("enter submit callback for adding a new movie")
      event.preventDefault();
      console.log("At submission, values.newMovieID is: "+values.newMovieID)
      let alreadyExist = false;
      
      //get a reference to the database
      let AllLists = firebase.database().ref('AllLists')
      let allMovies = AllLists.child('All')

      allMovies.on( 'value', snapshot => {
        const receivedJSON = snapshot.val()
        console.log(receivedJSON);
        snapshot.forEach(function(childSnapshot){
          var IMDbID = childSnapshot.child("IMDbID").val();
          if(IMDbID == values.newMovieID){
            alreadyExist = true;
          }
        })
      })

      if(alreadyExist)
        console.log("❌Movie already in database, not added")
      else  
        console.log('✅ Movie not in database, now add')

      //if not existed in our own database, find it in IMDB and store to our own
      if(!alreadyExist){
        const axios = require('axios').default; // axios.<method> will now provide autocomplete and parameter typings
        
        
            let url="https://www.omdbapi.com/?apikey=16e23e6c&i=" + values.newMovieID;
            let recvPack = axios.get(url);
            let packData     ;
            let recvTitle    ;
            let recvDirector ;
            let recvRating   ;
            let recvPosterURL;
            let recvActors   ;
            let recvGenre    ;
            axios.get(url)  
            .then(response => {
                //A unique ID, Title, Poster source, Director, IMDbID, Actors
                packData      = response.data;
                recvTitle     = packData.Title;
                recvDirector  = packData.Director;
                recvRating    = packData.imdbRating;
                recvPosterURL = packData.Poster;
                recvActors    = packData.Actors;
                recvGenre     = packData.Genre;
                //console.log(movieURLs[index])
                //movieArray[index].title = packData.data.Title;                  //new value    
            })
            .then(() => {
                console.log("recvTitle is: "+ recvTitle)
                console.log("recvDirector is: "+ recvDirector)
                console.log("recvRating is: "+ recvRating)
                console.log("recvPosterURL is: "+ recvPosterURL)
                console.log("recvActors is: "+ recvActors)  
                console.log("recvGenre is: "+ recvGenre)  
                
                firebase.database().ref('AllLists').child('All').child(values.newMovieID).set(
                  {IMDbID: values.newMovieID,
                  Title: recvTitle,
                  PosterURL: recvPosterURL,
                  Director: recvDirector,
                  Actors: recvActors,
                  Genre: recvGenre,
                  Rating: recvRating
                }
                  );  
                      
            })
        

        
      }
      
      setVisible(true);          
      //set everything to default after submission
      setValues({newMovieID:""}) 
      
      
  }
                                             

                                                        
      //used for configuring the alert box
    const [visible, setVisible] = useState(false);
    const onafterprint = () => setVisible(false);

return(
    <div className="GuestBook" style={guestBookStyle}>
        <form onSubmit={handleSubmit} noValidate>
        
          <div style={formInputDivStyle}> 
            <label style={formLabelFontStyle}>IMDBid</label>
            <br/>
            <input name="newMovieID" type="newMovieID" value={values.newMovieID} onChange={handleTextChange} style={formInputFontStyle}/>
          </div>
          
  
          <div style={formInputDivStyle} onClick={handleSubmit} >
            <button type="submit">submit</button>
          </div>

          
          <Alert style={formInputDivStyle} color="info" isOpen={visible} toggle={onafterprint} fade={true} >
            Add request sent!
          </Alert>
        </form>
        
    </div>
  
)


}

export default AddMovie;