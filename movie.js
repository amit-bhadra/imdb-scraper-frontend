const main = document.querySelector('main');
const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = 'https://imdb-scraper.amitbhadra.now.sh/';

function getMovie(imdbID) {
    return fetch(`${BASE_URL}movie/${imdbID}`)
        .then(res => res.json());
}

function showMovie(movie) {
    console.log(movie);
    const section = document.createElement('section');

    const properties = [
        {
            title:'IMDB Rating',
            property: 'imdbRating'
        }, 
        {
            title: 'Run Time',
            property: 'runTime'
        }, 
        {
            title: 'Release Date',
            property: 'releaseDate'
        }, 
        {
            title: 'Summary',
            property: 'summary'
        }];

    const descriptionHTML = properties.reduce((html, property) => {
        html += `
            <dt class="col-sm-3">${property.title}</dt>
            <dd class="col-sm-9">${movie[property.property]}</dd>
        `;
        return html;
    }, '');

    main.appendChild(section);
    section.outerHTML = `
        <section class="row">
            <h1 class="text-center">${movie.title}</h1>
            <div class="col-sm-12">
                <img src="${movie.poster}" class="img-fluid">
            </div>
            <div class="col-sm-12">
                <dl class="row">
                    ${descriptionHTML}
                </dl>
            </div>
        </section>
    `
}

getMovie(imdbID)
    .then(showMovie);