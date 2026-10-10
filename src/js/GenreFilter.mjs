export default class GenreFilter { 
    constructor(mediaType, selectElement, services, onChange) {
        this.mediaType = mediaType;
        this.selectElement = selectElement;
        this.services = services;
        this.onChange = onChange;
    }

    async init() {
        await this.loadGenres();

        this.selectElement.addEventListener('change', () => {
            this.onChange(this.selectElement.value);
        });
    }

    async loadGenres() {
        while (this.selectElement.optionslength > 1) {
            this.selectElement.remove(1);
        }
        this.selectElement.value = '';

        try {
            const genres = await this.services.getGenres(this.mediaType);
            genres.forEach((genre) => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                this.selectElement.appendChild(option);
            });
        } catch (error) {
            console.error('Could not load genres:', error.message);
        }
    }

    async setMediaType(mediaType) {
        this.mediaType = mediaType;
        await this.loadGenres();
    }
}