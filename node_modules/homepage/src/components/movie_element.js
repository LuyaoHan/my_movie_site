import React, { Component } from "react";
import axios from "axios";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import SubjectIcon from "@material-ui/icons/Subject";

import InfoIcon from "@material-ui/icons/Info";
function titleBarStyle() {
  return {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",

    width: "100%",
    height: "100%",
  };
}

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movieData: {},
      open: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=cab6a2b3&i=${this.props.movieid}&plot=full`
      )
      .then((res) => res.data)
      .then((res) => {
        this.setState({ movieData: res });
      });
  }

  render() {
    if (!this.state.movieData.Poster || this.state.movieData === "N/A")
      return null;
    return (
      <GridListTile key={this.props.indexKey} cols={1} rows={2}>
        <img
          src={this.state.movieData.Poster}
          alt={this.state.movieData.Title}
        />
        
        <GridListTileBar
          title={this.state.movieData.Title}  //display the movie name
          titlePosition="top"   
          actionIcon={
            <div>
            <IconButton
              aria-label={`info ${this.state.movieData.Title}`}
              style={{ color: "white" }}
              onClick={() => {
                this.props.changeIndexKey(this.props.indexKey);
                this.props.setOpen(true);
                this.props.changeMoviePoster(this.state.movieData);
                  //<DeleteSweepIcon>
              }}
            >
              <InfoIcon />
            </IconButton>

            
            </div>
          }
          actionPosition="left"
          className={titleBarStyle()}
        />
      </GridListTile>
    );
  }
}

export default Movie;