import { getPosterUrl, renderListWithTemplate, setStatus } from './utils.mjs';

function watchlistCardTemplate(item) {
    const poster = getPosterUrl(item.posterPath);
    const image = poster? `<img src="${poster}" alt="Poster for ${item.title}" loading="lazy">`
    : '<div class="no-poster">No image</div>';

    return `<li class="movie-card" data-id="${item.id}" data-media-type="${item.mediaType}">
        <a href="/details.htmls?id=${item.id}&amp;type=${item.mediaType}" class="movie-card__link">
            ${image}
            <h2 class="movie-card__title">${item.title}</h2>
            </a>
            <button type="button" class="remove-button" aria-label="Remove ${item.title} from watchlist">Remove</button>
    </li>`;
}

export default class WatchlistPage {
    constructor(listElement, statusElement, watchlist) {
        this.listElement = listElement;
        this.statusElement = statusElement;
        this.watchlist = watchlist;
    }

    init() {
        this.render();

        this.listElement.addEventListener('click', (event) => {
            const button = event.target.closest('.remove-button');
            if (!button) {
                return;
            }
            const card = button.closest('.movie-card');
            this.watchlist.remove(card.dataset.id, card.dataset.mediaType);
            this.render();
        });
    }

    render () {
        const items = this.watchlist.getAll();

        if (items.length === 0) {
            this.listElement.innerHTML = '';
            setStatus(this.statusElement, 'Your watchlist is empty. Browse titles and add some!');
            return;
        }

        setStatus(this.statusElement);
        renderListWithTemplate(watchlistCardTemplate, this.listElement, items, 'beforeend', true);
    }
}