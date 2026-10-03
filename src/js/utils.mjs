export async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    }
    throw new Error(data.status_message || `Request failed (status ${res.status})`);
}

export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function getPosterUrl(path, size = 'w342') {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
}

export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = 'beforeend',
    clear = false,
) {
    if (clear) {
        parentElement.innerHTML = '';
    }
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function setStatus(element, message = '', isError = false) {
    element.textContent = message;
    element.classList.toggle('status--error', isError);
}