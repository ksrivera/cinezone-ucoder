//DOM elements document object model data object model 

const filterRadio = document.querySelector('.search-radio'); //movie search filter
const searchBtn = document.querySelector('.btn'); //search button natin to
const movieList = document.getElementById('popular-movies'); //Popular Movie
const tvList = document.getElementById('popular-shows') //Popular TV Shows
const form = document.querySelector('form');
const search_term = document.querySelector('#search-term')
const search_results = document.querySelector('#search-results')
console.log(search_results);
//API
const API_KEY = 'api_key=cc507604b560289bf1eca88c1d5f2775';
const BASE_API_URL = 'https://api.themoviedb.org/3';
const TOPTV_URL = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=2&sort_by=popularity.desc&${API_KEY}`; //note yung page number > pagination
const TOPMOVIE_URL = `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&page=1`; //note yung page number
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const searchMovies_url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=furious`


// const SEARCH_URL = 

//Global var
let inputQuery;
/* FLOW
check muna kung movie or tv ang isesearch ni user
then may listener sa textbox = search term
by default may popular movie sa index
sa tv shows tab >> popular tv shows naman 

per movie and tv show, may backdrop nung poster, api din galing yung image
<for review yung PAGINATION>

*/

const createList = (data) => {
    console.log(data);

    try {
    data.forEach(item => {
        const {title, poster_path, release_date, overview, id} = item;
// console.log(id);

            //paglalagatan ng na-fetch natin sa API, eg popular movies/tv shows
            const img = document.createElement('img'); //OK
            img.className = 'card-img-top'; //OK
            img.alt = `${overview}`; //OK
            img.src = `${POSTER_BASE_URL}${poster_path}`; //OK        
    
            const a = document.createElement('a');
            a.href = `tv-details.html?id=${id}`; //OK pero need baguhin yung value

            a.appendChild(img); /*   <a href="movie-details.html?id=1">
                                        <img
                                        src="./images/no-image.jpg"
                                        class="card-img-top"
                                        alt="Movie Title"
                                        />
                                        </a> */

            const divCardBody = document.createElement('div');
            divCardBody.className = 'card-body';
            const h5 = document.createElement('h5');
            h5.className = 'card-title';
            const h5Text = document.createTextNode(`${title}`) //galing API yung text niya -> ${title/name}
            h5.appendChild(h5Text);

            const p = document.createElement('p');
            p.className = 'card-text';

            const small = document.createElement('small');
            small.className = 'text-muted';
            const smallText = document.createTextNode(`Release: ${release_date}`); //galing API yung text niya -> ${release_date}
            small.appendChild(smallText);

            p.appendChild(small); 
            divCardBody.appendChild(h5);
            divCardBody.appendChild(p);


            const divParent = document.createElement('div');
            divParent.className = 'card';

            divParent.appendChild(a);
            divParent.appendChild(divCardBody); 
            
            movieList.appendChild(divParent);
            // tvList.appendChild(divParent)
        
    })
    } catch (error) {
        console.log(error);
    }
}

const creatTvShowList = (item) => {
    item.forEach((items) => {
        const poster_path = items.poster_path;
        const name = items.name;
        const date = items.first_air_date;
        const id = items.id
        

        const showList = `<div class="card">
        <a href="tv-details.html?id=${id}">
          <img
            src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path
            }"
            class="card-img-top"
            alt="Show Title"
          />
        </a>
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${date
            }</small>
          </p>
        </div>
      </div>`
    tvList.insertAdjacentHTML('beforeend', showList)
    })
}

const tvShowDetails = function (item) {
    item.forEach((items) => {
        console.log(items);
        const details = `<div class="details-top">
        <div>
          <img
            src="./images/no-image.jpg"
            class="card-img-top"
            alt="Show Name"
          />
        </div>
        <div>
          <h2>Show Name</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            8 / 10
          </p>
          <p class="text-muted">Release Date: XX/XX/XXXX</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
            aut, illum nesciunt esse cum tempora ipsa animi unde repellendus
            recusandae, quidem libero labore beatae sint nostrum inventore!
            Inventore libero sit exercitationem non magni odio nobis dolorum
            quae, deserunt quo unde labore consequuntur amet voluptatum vitae
            omnis dignissimos error quasi tempora?
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
            <li>Genre 1</li>
            <li>Genre 2</li>
            <li>Genre 3</li>
          </ul>
          <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
          <li><span class="text-secondary">Number Of Episodes:</span> 50</li>
          <li>
            <span class="text-secondary">Last Episode To Air:</span> Last
            Aired Show Episode
          </li>
          <li><span class="text-secondary">Status:</span> Released</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">Company 1, Company 2, Company 3</div>
      </div>`
    })
    }

const getPopularTVShows = async () => {
    try {
       const response = await fetch(`${TOPTV_URL}`);
       const data = await response.json();
       creatTvShowList(data.results);
       createList(data.results)
       tvShowDetails(data.results)
       console.log(data.page);
    } catch (error) {
        console.log(error);
    }
}

getPopularTVShows()
const getPopularMovies = async (url) => {
    try {
        const response = await fetch(TOPMOVIE_URL);
        const data = await response.json();
        createList(data.results);
    } catch (error) {
        console.log(error);
    }
}

const getType = (e) => {
    // e.preventDefault();
    const movieType = document.getElementById('movie').checked;

    let query = getInput();

    if (movieType) {
        console.log('you have clicked movie');
        searchMovie(query);
    } else {
        console.log('you have clicked tv');
        searchTv(query);
    } 
}

const getInput = (e) => {
    // e.preventDefault();
    const searchTerm = document.querySelector('#search-term'); //search keyword for get

    if (searchTerm.value.length > 0) {
        return searchTerm.value
    }
}

const searchMovie = async (query) => {
  // query.preventDefault();
try{

  const search_value = search_term.value

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${search_value}`);

    const data = await response.json();
    data.results.forEach((item) => {
      console.log(item);
      searchMovieAdd(item)
    })
}catch (error) {
  console.log(error);
}
  //     const poster_path = item.poster_path;
  //     const name = item.title;
  //     const date = item.release_date;
  //     const id = item.id
  //     console.log(name, poster_path, date, id);
  // console.log(search_results);
  //     const showList = `<div class="card">
  //     <a href="tv-details.html?id=${id}">
  //       <img src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}" class="card-img-top" alt="" />
  //     </a>
  //     <div class="card-body">
  //       <h5 class="card-title">${name}</h5>
  //       <p class="card-text">
  //         <small class="text-muted">Release: ${date}</small>
  //       </p>
  //     </div>
  //   </div>`
  //     search_results.insertAdjacentHTML('beforeend', showList)
    // search_term.addEventListener('input', function(e) {
    //     const title = document.querySelectorAll('.card')
    //     // console.log(e.target);
    //    console.log(title.innertext);
    //     title.forEach((item) => {
    //         const tvShow_title = item.textContent
    //         if(tvShow_title.toLowerCase().includes(search_value.toLowerCase())){

    //     item.style.display = "";
    //     } else {
    //       item.style.display = "none";
    //     }
            
    //     })

    // })
    //console.log(query);
    // createList(data.results);
}

const searchMovieAdd = function (item) {
  const poster_path = item.poster_path;
  const name = item.title;
  const date = item.release_date;
  const id = item.id
  console.log(name, poster_path, date, id);
console.log(search_results);
  const showList = `<div class="card">
  <a href="tv-details.html?id=${id}">
    <img src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}" class="card-img-top" alt="" />
  </a>
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${date}</small>
    </p>
  </div>
</div>`
  search_results.insertAdjacentHTML('beforeend', showList)
}


const searchTv = async (query) => {
   console.log('dito ka sa tvshow');
search_term.addEventListener('input', function() {
    const search_value = search_term.value
    const title = document.querySelectorAll('h5')

    title.forEach((item) => {
        const tvShow_title = item.textContent
        if(tvShow_title.toLowerCase().includes(search_value.toLowerCase())){
            item.style.display = "";
    } else {
      item.style.display = "none";
    }
        
    })

})
}

//getSearchQuery();


const onLoad = () => {
    //DOMContentLoad or window.onload
    console.log('kunwari nagload'); //OK
    //getPopularMovies();
    //getPosterImg();
    searchMovie()
    getPopularTVShows()
    getPopularMovies(TOPMOVIE_URL);
}

//Event listeners

searchBtn.addEventListener('click', searchMovie);
document.addEventListener('DOMContentLoaded', onLoad);
//filterRadio.addEventListener('click', getType);
// search_term.addEventListener('keypress', searchMovie)

form.addEventListener('click', getType)