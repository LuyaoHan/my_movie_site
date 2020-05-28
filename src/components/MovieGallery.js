import React, { useState, Component } from "react";

import Movie from "./movie_element.js";
import GridList from "@material-ui/core/GridList";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Dropdown from './Dropdown';
import config from './config.js'


function rootStyle() {
  return {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  };
}
function GridListStyle() {
  return {
    width: "95%",
    height: "85vh",
    //position: "fixed",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //transform: "translateZ(0)",
  };
}
function info() {
  return {
    width: "auto",
    height: "auto",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "23%",
    paddingLeft: "10px",
    paddingRight: "10px",
    lineHeight: "200%",
    backgroundColor: "#c3cfe2",
  };
}
function getModalStyle() {
  return {
    top: "20%",
    left: "20%",
    backgroundColor: "transparent",
    position: "absolute",
    display: "flex",
  };
}


//Fetch data from firebase
const firebase = require('firebase');


export default class MovieGallery extends Component {
    
  
  constructor() {
        super();
        this.state = {
          moviePoster: "",
          open: false,
          key: 1,
          isOpen: false,
          toggle: 0,
          visible: 8,
          movies_list: [], 
          perf_listSelection: [],  
          //perf_list: [],  //All, wannaWatch, Watched, etc
          listShown:[],
          movie_perf_pairs:[]
        };
        this.changeMoviePoster = (data) => {
          this.setState({
            moviePoster: data,
          });
        };
        this.changeKey = (k) => {
          this.setState({
            key: k,
          });
        };
        this.setOpen = (o) => {
          this.setState({
            open: o,
          });
        };

        this.loadmore = this.loadmore.bind(this);  //bind evnt handler! 
        this.listSelectOnChange = this.listSelectOnChange.bind(this)
        this.ModalDropOptions = this.ModalDropOptions.bind(this)
        this.perf_list = [];
      //initialize firebase
        if(!firebase.apps.length){
          firebase.initializeApp(config)
      }

    
      

      

  }

  //load more button 
  loadmore(){         //binded in constructor
    this.setState((old)=>{
      return {visible: old.visible + 8}  //trys to set visible 8 more movies   
    })
  }
  
  
  
  componentWillMount(){

    if(!firebase.apps.length){
      firebase.initializeApp(config)
  }
    console.log("component will mount!")
      let AllLists = firebase.database().ref('AllLists')
      let allMovies = AllLists.child('All')

      //
      //  Update all movies info from data base
      //
      var recvObjects = [];
      var cnt = 0;
      allMovies.on( 'value', snapshot => {
        const receivedJSON = snapshot.val()
        //console.log(receivedJSON);

        //loop through all movies in database
        snapshot.forEach(function(childSnapshot){
          //receive single movie info
          var recvIMDbID        = childSnapshot.child("IMDbID").val();
          var recvTitle         = childSnapshot.child("Title").val();
          var recvDirector      = childSnapshot.child("Director").val();
          var recvRating        = childSnapshot.child("Rating").val();
          var recvPosterURL     = childSnapshot.child("PosterURL").val();
          var recvActors        = childSnapshot.child("Actors").val();
          var recvGenre         = childSnapshot.child("Genre").val();
          var recvKey               = childSnapshot.child("IMDbID").val();
          recvObjects.push({
              key:        recvKey,
              IMDbID:     recvIMDbID,      
              Title:      recvTitle,
              PosterURL:  recvPosterURL,
              Director:   recvDirector,
              Actors:     recvActors,
              Genre:      recvGenre,
              Rating:     recvRating
          })
          //make into object      
        })
        

        this.setState({
          movies_list:[...this.state.movies_list,...recvObjects]
        })
        //console.log("in state: " + this.state.movies_list) //expected print [object object] ... 
      })

      //
      //  Update all lists names only
      //
      // let AllLists = firebase.database().ref('AllLists'); //root folder on firebase
      var perfArraySelection = [];
      var cnt = 0;
      AllLists.on( 'value', snapshot => {
        const receivedJSON = snapshot.val()
        //console.log(receivedJSON);
        //loop through all movies in database
        snapshot.forEach((item, index) =>{
          //receive single movie info
          perfArraySelection.push(item.key); //get the list
          
          //console.log("perference list name is: " + perfArraySelection);
        
          //make into object      
        })
        this.setState({ 
          perf_listSelection:[...this.state.perf_listSelection,...perfArraySelection]
        })
       
      });
  


       //
      //  Gets all the lists and list movie info
      //
      //let AllLists = firebase.database().ref('AllLists'); //root folder on firebase
      var perfArray = [];
      var movie = [];
      var cnt = 0;
      var moviesMasterArray = []; //used to collect all movie lists 
      var moviesInOneArray = [];  //records all movies in one list
      AllLists.on( 'value', snapshot => {
        const receivedJSON = snapshot.val()
        //console.log(receivedJSON);
        //loop through all movies in database
        
        //console.log("here");
        snapshot.forEach((eachList, index) =>{ //all the lists 
              //console.log(eachList.key);          //print each list name     
              eachList.forEach(function(singleMovie){    //print movie name
                            //console.log(singleMovie.key+": "+singleMovie.val()); //generates random key

                            //console.log("movie title: "+singleMovie.child('Title').val())
                            var recvIMDbID        = singleMovie.child("IMDbID").val();
                            var recvTitle         = singleMovie.child("Title").val();
                            var recvDirector      = singleMovie.child("Director").val();
                            var recvRating        = singleMovie.child("Rating").val();
                            var recvPosterURL     = singleMovie.child("PosterURL").val();
                            var recvActors        = singleMovie.child("Actors").val();
                            var recvGenre         = singleMovie.child("Genre").val();
                            var recvKey           = singleMovie.child("IMDbID").val();
                            moviesInOneArray.push({
                                key:        recvKey,
                                IMDbID:     recvIMDbID,      
                                Title:      recvTitle,
                                PosterURL:  recvPosterURL,
                                Director:   recvDirector,
                                Actors:     recvActors,
                                Genre:      recvGenre,
                                Rating:     recvRating
                            })
                  
              })
              //collected all movies in one list
        })
        moviesMasterArray.push(moviesInOneArray);
        //console.log(moviesMasterArray)
        
        this.perf_list=moviesMasterArray;
        // this.setState({
        //   perf_list:[...moviesMasterArray]
        // })
        // /console.log("moviesMasterArray"+moviesMasterArray)
        //console.log("perf list is "+this.state.perf_list)
        this.forceUpdate();
        //console.log(this.state.perf_list[1]); //sets to the All list
        
        //set to listShown so that gallery display the correct posters
        this.setState({
          listShown:[...this.perf_list[0]]
        })
      });
      this.forceUpdate();





      //
      //  Prepare movie-perferencelist pairs
      //
      console.log("printing perf names")
      var movie_perf_Array = [];
      AllLists.on( 'value', snapshot => {
        const receivedJSON = snapshot.val()
        snapshot.child('movie_perf_pairs').forEach((eachPair, index) =>{ //all the lists 
                var recvIMDbID        = eachPair.child("IMDbID").val();
                console.log("movie is: " + recvIMDbID)
                eachPair.child('perfs').forEach((perfName,index)=>{
                    console.log(perfName.val())
                })
                
              //collected all movies in one list
        })
        moviesMasterArray.push(moviesInOneArray);
        //console.log(moviesMasterArray)
        
        this.perf_list=moviesMasterArray;
        // this.setState({
        //   perf_list:[...moviesMasterArray]
        // })
        // /console.log("moviesMasterArray"+moviesMasterArray)
        //console.log("perf list is "+this.state.perf_list)
        this.forceUpdate();
        //console.log(this.state.perf_list[1]); //sets to the All list
        
        //set to listShown so that gallery display the correct posters
        this.setState({
          listShown:[...this.perf_list[0]]
        })
      });
      this.forceUpdate();
      
      
}







  //user chosed list of movie to display in gallery
  listSelectOnChange(e) {
    console.log("target value: "+e.target.index)
    //set it to the state
    this.setState({
      [this.state.active_list]: this.state.perf_listSelection[e.target.index]
    });

    console.log("list selected: "+this.state.list_selected)
  }



  ModalDropOptions(e){

    this.state.perf_listSelection.map((e, key) => {
      
      return <option key={key} value={e.value}>{e}</option>;
    })
    
  }

  render() {
    

    return (
      <div style={{display:"block"}}>
        <div>
          {/*Dropdown menu*/}
          <select name="perf_listSelection" onChange={this.listSelectOnChange}>
            {this.state.perf_listSelection.map((e, key) => {
              //console.log("key is "+ key)
              return <option key={key} value={e.value}>{e}</option>;
            })}
            
          </select>
        </div>
        
          <div>
            
                {this.state.movies_list.map((s,index) => (
                <h6> 
                {s.Title}
                </h6>
              ))}
            

          </div>


        <div>
          <GridList cellHeight={150} spacing={1} style={GridListStyle()}>
                {/*{this.state.movies_list.slice(0,this.state.visible).map((movie) => (  */}
                  
                
                  {(this.state.listShown).map((movie) => (
                    
                  <Movie
                    movieid={movie.IMDbID}
                    indexKey={movie.key}
                    changeIndexKey={this.changeKey}
                    setOpen={this.setOpen}
                    changeMoviePoster={this.changeMoviePoster}
                  />
                ))}
          </GridList>




          <Modal
            open={this.state.open}
            onClose={() => {
              this.setOpen(false);
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {
              <div style={getModalStyle()}>
                <div style={info()}>
                  <h7>
                    Title: {this.state.moviePoster.Title} <br />
                    Director: {this.state.moviePoster.Director} <br />
                    Genre: {this.state.moviePoster.Genre}
                    <br />
                    IMDB Rating: {this.state.moviePoster.imdbRating}

                  </h7>
                    <div>
                      <select name="perf_listSelection" >
                        {
                          this.ModalDropOptions
                          
                        }
                      </select>
                    </div>
                </div>
                <img
                  src={this.state.moviePoster.Poster}
                  height={"auto"}
                  alt={"poster"}
                />

                <IconButton onClick={() => {
                    {/*Remember that in state key === IMDBkey!*/} 
                    const  deleteTargetKey = this.state.key; //key, which is IMDbID of the movie
                    var newMovieArray = [];
                    console.log('delete target' + this.state.key);
                    this.state.movies_list.forEach((item, index) => {
                      console.log('item key' + item.key);
                      if(item.key != this.state.key){
                        newMovieArray.push(item);  //push every item except delete target
                      }
                    });
                    console.log(newMovieArray)
                    this.setState({
                      movies_list:[]    
                    })
                    
                     this.setState({
                       movies_list:[...newMovieArray]    
                     })
                     
                     firebase.database().ref('AllLists').child('All').set(newMovieArray);
                      this.setOpen(false);
                    //  this.forceUpdate();

                  }} > 
                
                  <DeleteSweepIcon
                    style={{ color: "red" }}
                  />
                </IconButton>
                
              </div>
            }
          </Modal>

          
          <button type="button" onClick={this.loadmore} style={{position:'relative',alignItems:'center'}}>Load More~</button>
          
         
        </div>



        
       
      </div>
    );
  }
}
/*
 <div>
        <GridList cellHeight={150} spacing={1} style={GridListStyle()}>
          {Object.values(movies_list).map((movie) => (
            <Movie
              movieid={movie.id}
              indexKey={movie.key}
              changeIndexKey={this.changeKey}
              setOpen={this.setOpen}
              changeMoviePoster={this.changeMoviePoster}
            />
          ))}
        </GridList>




        <Modal
          open={this.state.open}
          onClose={() => {
            this.setOpen(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {
            <div style={getModalStyle()}>
              <div style={info()}>
                <h7>
                  Title: {this.state.moviePoster.Title} <br />
                  Director: {this.state.moviePoster.Director} <br />
                  Genre: {this.state.moviePoster.Genre}
                  <br />
                  imdbRating: {this.state.moviePoster.imdbRating}
                </h7>
              </div>
              <img
                src={this.state.moviePoster.Poster}
                height={"auto"}
                alt={"poster"}
              />
            </div>
          }
        </Modal>
        </div>

































        
import React, { Component } from 'react'

import ScrollTop from "react-scrolltop-button";
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper
import SimpleReactLightbox from "simple-react-lightbox"; // Import Simple React Lightbox
import axios from 'axios';
//API key: 16e23e6c
//http://www.omdbapi.com/?apikey=16e23e6c&i=tt0167261
//node node_modules/react-scripts/scripts/start.js
export default class MovieGallery extends Component {
    
    state = {
      movieURL1: "",movieURL2: "",movieURL3:"",movieURL4:"",
      movieURL5: "",movieURL6: "",movieURL7: "",movieURL8:"",
      movies: [
        {IMBD_ID:"tt7605074" , title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt0816692" , title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt1457767" , title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt0499549" , title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt4154796" , title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt5700672" , title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt10039344", title: "",director: "", rating:"", posterURL:""},
        {IMBD_ID:"tt0198781" , title: "",director: "", rating:"", posterURL:""} 
        ]
    };


    constructor(props) {
        super(props);
        // TODO
        var movieURLs = ["","","","","","","",""]
        var movieArray=[
            {IMBD_ID:"tt7605074" , title: "",director: "", rating:"", posterURL:""},             //The Wandering Earth
            {IMBD_ID:"tt0816692" , title: "",director: "", rating:"", posterURL:""},      //Interstellar
            {IMBD_ID:"tt1457767" , title: "",director: "", rating:"", posterURL:""},       //The Conjuring
            {IMBD_ID:"tt0499549" , title: "",director: "", rating:"", posterURL:""}, //Avatar
            {IMBD_ID:"tt4154796" , title: "",director: "", rating:"", posterURL:""},            //Avengers: Endgame
            {IMBD_ID:"tt5700672" , title: "",director: "", rating:"", posterURL:""},        //Train to Busan
            {IMBD_ID:"tt10039344", title: "",director: "", rating:"", posterURL:""},  //Countdown
            {IMBD_ID:"tt0198781" , title: "",director: "", rating:"", posterURL:""}         //Monsters, Inc.
        ]
        
        const axios = require('axios').default; // axios.<method> will now provide autocomplete and parameter typings
        
        movieArray.forEach((item,index) => {
            let url="https://www.omdbapi.com/?apikey=16e23e6c&i=" + item.IMBD_ID;
            let recvPack = axios.get(url);
            //console.log(index);
            //recvPack
            axios.get(url)
            .then(response => {
                const packData      = response.data;
                const recvTitle     = packData.Title;
                const recvDirector  = packData.Director;
                const recvRating    = packData.imdbRating;
                const recvPosterURL = packData.Poster;
                movieArray[index].title = recvTitle;
                movieArray[index].director = recvDirector;
                movieArray[index].rating = recvRating;
                movieArray[index].posterURL = recvPosterURL;
                movieURLs[index] = recvPosterURL;
                //console.log(movieURLs[index])
                //movieArray[index].title = packData.data.Title;                  //new value    
            })
            .then(() => {
                console.log("movieURL is: "+ movieURLs[0])
                this.state.movieURL1 = movieURLs[0];
                this.state.movies = movieArray
                this.forceUpdate();
            })
                
            

        });
  
        
      };
      
    componentWillMount(){
        document.title="www.luyao-han.online"     //define page name
        
       
        //console.log(movieURLs[0])
        //this.state.movies = movieArray;
        //console.log(movieURLs[1])
        
        
        
        //console.log(this.state.movies)
        //console.log(this.state.movieURL1)

       
      }
    render() {
        
        // Create an object with the options that you want to use. The options are divided in 4 main objects. You don't need to define them all.
    const SRLWrapperOptions = {
       
        settings: {
            overlayColor: "rgb(25, 136, 124)",
            autoplaySpeed: 1500,
            transitionSpeed: 900,
          },
          buttons: {
            backgroundColor: "#1b5245",
            iconColor: "rgba(126, 172, 139, 0.8)",
          },
          caption: {
            captionColor: "#a6cfa5",
            captionFontFamily: "Raleway, sans-serif",
            captionFontWeight: "300",
            captionTextTransform: "uppercase",
          }
      
    };


  
        const subSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#eb4d4b',
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
			backgroundColor: '#eb4d4b',
            backgroundRepeat: 'repeat-y',
            height:'200vh',
            width:'100vw',
            position: 'absolute',
            display:'block'
        }

        
        

        const titleSectionStyle={
            margin: '0',
			padding: '0',
			backgroundColor: '#eb4d4b',
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

        const lightboxOptions={
            position:'relative',
            overlayColor: "rgb(25, 136, 124)",
            captionColor: "#a6cfa5",
            captionFontFamily: "Raleway, sans-serif",
            captionFontSize: "22px",
            captionFontWeight: "300",
            captionFontStyle: "capitalize",
            buttonsBackgroundColor: "#1b5245",
            buttonsIconColor: "rgba(126, 172, 139, 0.8)",
            zIndex:'-1',
            enablePanzoom:'true',
            hideControlsAfter:'true',
            showCaption:'false',
            showDownloadButton:'false',
          };
          
        const scrollTopButtonStyle={
            background: 'white',
	        position: 'fixed',
	        bottom: '16px',
	        right: '32px',
	        width: '200px',
	        height: '50px',
	        //border-radius: 50%;
	        fontSize: '14px',
	        color: '#1f1f1f',
	        textDecoration:'none',
	        transition: 'all .4s'  
        };


        return (
            <html>
                <section style={titleSectionStyle}>
		            <font style={homeTitleStyle} >
			            Movies
		            </font>
                </section>
                <section style={bodyStyle}>                  
                        <SimpleReactLightbox style={{display:'block'}}>
                            <SRLWrapper>
                            <a href={this.state.movies[0]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[0]['posterURL']} 
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[0]['title'] + ','
                                + 'Director: ' + this.state.movies[0]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[0]['rating']}/>  
                            </a>
                          
                            <a href={this.state.movies[1]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[1]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[1]['title'] + ','
                                    + 'Director: ' + this.state.movies[1]['director'] + ',' 
                                    + 'IMDB raing: '+ this.state.movies[1]['rating']}/>  
                            </a>
                        
                            <a href={this.state.movies[2]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[2]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[2]['title'] + ','
                                + 'Director: ' + this.state.movies[2]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[2]['rating']}/>  
                            </a>
                       
                            <a href={this.state.movies[3]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[3]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[3]['title'] + ','
                                + 'Director: ' + this.state.movies[3]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[3]['rating']}/>    
                            </a>
                        
                            <a href={this.state.movies[4]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[4]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[4]['title'] + ','
                                + 'Director: ' + this.state.movies[4]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[4]['rating']}/>  
                            </a>
                        
                            <a href={this.state.movies[5]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[5]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[5]['title'] + ','
                                + 'Director: ' + this.state.movies[5]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[5]['rating']}/>   
                            </a>
                       
                            <a href={this.state.movies[6]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[6]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[6]['title'] + ','
                                + 'Director: ' + this.state.movies[6]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[6]['rating']}/>    
                            </a>

                            <a href={this.state.movies[7]['posterURL']} data-attribute="SRL">
                                <img src={this.state.movies[7]['posterURL']}  
                                className={'movie-posters'} 
                                alt={'Title: '+ this.state.movies[7]['title'] + ','
                                + 'Director: ' + this.state.movies[7]['director'] + ',' 
                                + 'IMDB raing: '+ this.state.movies[7]['rating']}/>    
                            </a>
                        </SRLWrapper>
                    </SimpleReactLightbox>                          
                </section>
            </html>
	
        )
    }
}
*/