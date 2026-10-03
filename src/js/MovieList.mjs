import {getPosterUrl, renderListWithTemplate, setStatus} from './utils.mjs';

function movieCardTemplate(item, mediaType) {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date || '';
    const year = date.slice(0, 4) || 'Unknown year';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const poster = getPosterUrl(item.poster_path);

    const image = poster
    ? `<img src="${poster}" alt="Poster for ${title}" loading="lazy">`
    : '<div class="no-poster">No Image</div>';

    return `<li class="movie-card" data-id="${item.id}" data-media-type="${mediaType}">
    ${image}
    <h2 class="movie-card__title">${title}</h2>
    <p class="movie-card__info">${year} &middot; &#9733; ${rating}</p>
    </li>`;
}

export default class MovieList {
    constructor(mediaType, listElement, statusElement, services) {
        this.mediaType = mediaType;
        this.listElement = listElement;
        this.statusElement = statusElement;
        this.services = services;
    }

    async init(genreId = '', page = 1) {
        setStatus(this.statusElement, 'Loading...');
        try {
            const data = await this.services.discover(this.mediaType, genreId, page);
            if (data.results.length === 0) {
                this.listElement.innerHTML = '';
                setStatus(this.statusElement, 'No results found.');
            } else {
                setStatus(this.statusElement);
                this.render(data.results);
            }
            return data;
        } catch (error) {
            this.listElement.innerHTML = '';
            setStatus(this.statusElement, `Sorry, we could not load results. (${error.message})`, true);
            return null;
        }
    }

    render(list) {
        renderListWithTemplate(
            (item) => movieCardTemplate(item, this.mediaType),
            this.listElement,
            list, 
            'beforeend',
            true
        );
    }
}