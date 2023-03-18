import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListGroup from "./common/listGroup";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "./../utils/paginate";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import auth from "../services/authService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  //componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  //such as fetch any data from an API then API call
  //should be placed in this lifecycle method, and then we get the response,
  //we can call the setState() method and render the element with updated data.
  async componentDidMount() {
    const { data } = await getGenres();
    // all genres and genres from getGenres
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  // delete movie
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    //handle async and error
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // handle Like
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    const userName = auth.getCurrentUser().name;
    let likedMovies =
      localStorage.getItem(userName) !== null
        ? JSON.parse(localStorage.getItem(userName))
        : [];

    movies[index] = { ...movies[index] };

    // return array of single movie if that movie is already liked
    const isMovieLiked = likedMovies.filter(
      (likedMovie) => likedMovie.title === movies[index].title
    );

    // check if array is empty or not
    if (isMovieLiked.length !== 0) {
      // if not, find movie and unlike
      const likedMovieIndex = likedMovies.indexOf(isMovieLiked[0]);
      likedMovies.splice(likedMovieIndex, 1);
      localStorage.setItem(userName, JSON.stringify(likedMovies));
    } else {
      // else like movie
      likedMovies.push(movies[index]);
      localStorage.setItem(userName, JSON.stringify(likedMovies));
    }

    //just to trigger component reload
    this.setState({ movies });
  };

  getPaginatedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filteredMovies = allMovies;
    // search box
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // genre list
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the databse.</p>;

    const { totalCount, data: movies } = this.getPaginatedData();
    return (
      <React.Fragment>
        <div className="row row-content">
          {/* left side - genres list */}
          <div className="col-2 genre-list">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          {/* right side - movie list */}
          <div className="col table-list">
            {user && user.isAdmin && (
              <Link to="/movies/new" className="btn btn-primary">
                New Movie
              </Link>
            )}

            <p className="table-p">
              Showing {totalCount} movies in the database.
            </p>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
