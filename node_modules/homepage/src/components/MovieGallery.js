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
            
                
            

          </div>


        <div>
          <GridList cellHeight={150} spacing={1} style={GridListStyle()}>
                {/*{this.state.movies_list.slice(0,this.state.visible).map((movie) => (  */}
                  
                
                  {(this.state.movies_list).slice(0,this.state.visible).map((movie) => (
                    
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
                        console.log("here")
                        console.log(item.Title)
                      }
                    });
                    console.log(newMovieArray)
                    
                    
                     this.setState({
                       movies_list:[...newMovieArray]    
                     })
                     //this.forceUpdate();
                     //firebase.database().ref('AllLists').child("All").child(this.state.key).remove()
                     
                    this.setOpen(false);
                     //this.forceUpdate();

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
