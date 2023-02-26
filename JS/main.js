$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=87b3cfc")
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
      `;
      });
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=87b3cfc")
    .then((response) => {
      let movie = response.data;

      let output = `
    <div class="row">
      <div class="col-md-4">
       <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
       <h2>${movie.Title}</h2>
       <ul class="list-group"> 
        <li class="list-group-item"><b>Genre:${movie.Genre}</b></li>
        <li class="list-group-item"><b>Released:${movie.Released}</b></li>
        <li class="list-group-item"><b>Rated:${movie.Rated}</b></li>
        <li class="list-group-item"><b>IMDB Rating:${movie.imdbRating}</b></li>
        <li class="list-group-item"><b>Director:${movie.Director}</b></li>
        <li class="list-group-item"><b>Writer:${movie.Writer}</b></li>
        <li class="list-group-item"><b>Actors:${movie.Actors}</b></li>
       </ul>
      </div>
    </div>

   <div class="row"> 
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-info"> View IMDB </a>
        <a href="index.html" class="btn btn-info"> Search </a>
      </div>
    </div>
   
   `;
      //some comment

      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
