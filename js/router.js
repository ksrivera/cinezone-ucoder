//DOM elements
const tvNav = document.querySelector('tv-shows')

const route = (e) => {
    e = e || window.e;
    e.preventDefault();
    window.history.pushState({}, '', e.target.href);

};

window.route  = route;

const routes = {
    404: '/pages/404.html',
    '/': '/pages/index.html',
    '/shows': '/pages/shows.html',
    '/search': '/search.html',
    '/movie-details': '/movie-details.html',
    'tv-details': 'tv-details',
}; 