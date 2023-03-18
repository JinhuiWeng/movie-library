import React from "react";
import auth from "../../services/authService";

const Like = (props) => {
  const userName = auth.getCurrentUser().name;
  const likedMovies = JSON.parse(localStorage.getItem(userName));

  const isMovieLiked = likedMovies.filter(
    (likedMovie) => likedMovie.title === props.title
  );

  let classes = isMovieLiked.length === 1 ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <i
      onClick={props.onClick}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;
