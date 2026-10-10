const STORAGE_KEY = 'moviesathome-watchlist';

export default class Watchlist {
    getAll() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    }

    has(id, mediaType) {
        return this.getAll().some(
            (item) => String(item.id) === String(id) && item.mediaType === mediaType
        );
    }

    add(entry) {
        if (this.has(entry.id, entry.mediaType)) {
            return;
        }
        const list = this.getAll();
        list.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    remove(id, mediaType) {
        const list = this.getAll().filter(
            (item) => !(String(item.id) === String(id) && item.mediaType === mediaType)
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    toggle(entry) {
        if (this.has(entry.id, entry.mediaType)) {
            this.remove(entry.id, entry.mediaType);
            return false;
        }
        this.add(entry);
        return true;
    }
}