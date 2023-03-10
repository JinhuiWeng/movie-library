import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

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

// export function likeMovie(movie) {
    
// }

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
