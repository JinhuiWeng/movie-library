import http from "./httpService";

const apiEndpoint = "/movies";

//set auth user
http.setJwt(localStorage.getItem("token"));

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// get all movies
export function getMovies() {
  return http.get(apiEndpoint);
}

// get single movie
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  // existing movie
  if (movie._id) {
    const body = { ...movie };
    delete body._id; // remove id object
    return http.put(movieUrl(movie._id), body);
  }
  //new movie
  return http.post(apiEndpoint, movie);
}


export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
