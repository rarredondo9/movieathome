import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";
import GenreFilter from "./GenreFilter.mjs";
import { qs } from './utils.mjs';

const services = new ExternalServices();
const movieList = new MovieList('movie', qs('#movie-list'), qs('#status'), services);
const searchInput = qs('#search-input');
const genreSelect = qs('#genre-select');

movieList.init();

const genreFilter = new GenreFilter(
    'movie',
    genreSelect,
    services,
    (genreId) => {
        searchInput.value = '';
        movieList.init(genreId)
    }
);
genreFilter.init();

qs ('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    genreSelect.value = '';

    if (query) {
        movieList.search(query);
    } else {
        movieList.init();
    }
});