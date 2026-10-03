import { qs } from './utils.mjs';

export default class Pager {
    constructor(navElement, onPageChange) {
        this.navElement = navElement;
        this.prevButton = qs('#prev-page', navElement);
        this.nextButton = qs('#next-page', navElement);
        this.infoElement = qs('#page-info', navElement);
        this.onPageChange = onPageChange;
        this.page = 1 ;

        this.prevButton.addEventListener('click', () => this.onPageChange(this.page -1));
        this.nextButton.addEventListener('click', () => this.onPageChange(this.page +1));
    }

    update(page, totalPages) {
        this.page = page;
        this.navElement.hidden = totalPages <= 1;
        this.infoElement.textContent = `Page ${page} of ${totalPages}`;
        this.prevButton.disabled = page <= 1;
        this.nextButton.disabled = page >= totalPages;
    }
}