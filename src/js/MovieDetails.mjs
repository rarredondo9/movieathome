import { getPosterUrl, formatRuntime, setStatus } from "./utils.mjs";

function trailerTemplate(item) {
    const videos = (item.videos && item.videos.results) || [];
    const trailer = videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

    if (!trailer) {
        return '<p class="details__empty">No trailer available.</p>';
    }

    return `<div class="trailer">
        <iframe
            src="https://www.youtube-nocookie.com/embed/${trailer.key}"
            title="Trailer for ${item.title || item.name}
            allow="fullscreen"
            allowfullscreen
            loading="lazy"></iframe>
        </div>`;
}

function castTemplate(item) {
    const cast = ((item.credits && item.credits.cast) || []).slice(0, 10);

    if (cast.length === 0) {
        return '<p class="details__empty">No cast information vailable.</p>';
    }

    const members = cast
        .map((person) => {
            const photo = getPosterUrl(person.profile_path, 'w185');
            const image = photo
                ? `<img src="${photo}" alt="" loading="lazy">`
                : '<div class="no-poster">No photo</div>';

            return `<li class="cast-member">
                ${image}
                <p class="cast-member__name">${person.name}</p>
                <p class="cast-member__role">${person.character || ''}</p>
            </li>`;
        })
        .join('');

    return `<ul class="cast-list">${members}</ul>`;
}

function detailsTemplate(item) {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date || '';
    const year = date.slice(0, 4);
    const runtime = formatRuntime(item.runtime || (item.episode_run_time && item.episode_run_time[0]));
    const genres = item.genres.map((genre) => genre.name).join(', ');
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const poster = getPosterUrl(item.poster_path, 'w500');

    const image = poster
        ? `<img src="${poster}" alt="Poster for ${title}">`
        : '<div class="no-poster">No image</div>';

    const facts = [year, runtime, genres].filter(Boolean).join(' &middot;');

    return `<div class="details__poster">${image}</div>
        <div class="details__info">
            <h2>${title}</h2>
            <p class="details__facts">${facts}</p>
            <p class="details_rating">&#9733; TMDb rating; ${rating}</p>
            <h3>Overvierw</h3>
            <p>${item.overview || 'No overview available.'}</p>
        </div>
        <section class="details__extras">
            <h3>Trailer</h3>
            ${trailerTemplate(item)}
            <h3>Cast</h3>
            ${castTemplate(item)}
        </section>`;
}

export default class MovieDetails {
    constructor(mediaType, id, container, statusElement, services) {
        this.mediaType = mediaType;
        this.id = id;
        this.container = container;
        this.statusElement = statusElement;
        this.services = services;
    }

    async init() {
        if (!this.id || !['movie', 'tv'].includes(this.mediaType)) {
            setStatus(this.statusElement, 'Sorry, we could not find that title.', true);
            return;
        }

        setStatus(this.statusElement, 'Loading...');
        try {
            const item = await this.services.getDetails(this.mediaType, this.id);
            setStatus(this.statusElement);
            this.container.innerHTML = detailsTemplate(item);
            document.title = `${item.title || item.name} |Movies at Home`;
        } catch (error) {
            setStatus(this.statusElement, `Sorry we could not load details. (${error.message})`, true);
        }
    }
}