import { convertToJson } from "./utils.mjs";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const omdbURL = 'https://www.omdbapi.com/';
const omdbKey = import.meta.env.VITE_OMDB_API_KEY;

export default class ExternalServices {
  async getGenres(mediaType = "movie") {
    const response = await fetch(
      `${baseURL}/genre/${mediaType}/list?api_key=${apiKey}`,
    );
    const data = await convertToJson(response);
    return data.genres;
  }

  async discover(mediaType = "movie", genreID = "", page = 1) {
    let url = `${baseURL}/discover/${mediaType}?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`;
    if (genreID) {
      url += `&with_genres=${genreID}`;
    }
    const response = await fetch(url);
    return convertToJson(response);
  }

  async search(mediaType = "movie", query = "", page = 1) {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await fetch(
      `${baseURL}/search/${mediaType}?api_key=${apiKey}&query=${encodedQuery}&page=${page}`,
    );
    return convertToJson(response);
  }

  async getDetails(mediaType, id) {
    const response = await fetch(
      `${baseURL}/${mediaType}/${id}?api_key=${apiKey}&append_to_response=videos,credits,external_ids`,
    );
    return convertToJson(response);
  }

  async getRatings(imdbId) {
    const response = await fetch(`${omdbURL}?apikey=${omdbKey}&i=${imdbId}`);
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No ratings found');
    }
    return data;
  }
}
