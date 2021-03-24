$(document).ready(()=>{
  $('#searchForm').on('submit', (e)=>{
   let searchText=$('#searchText').val();
   getMovies(searchText)
    e.preventDefault();

  })
});

function getMovies(searchText){
  axios.get(`http://www.omdapi.com?s=${searchText}`).then((response)=>{
    let movies = response.data.Search;
    let output = '';
    $.each(movies,(index,movie)=>{
      output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}"
          <h5>${movie.title}</h5>
        </div>
      </div>
      `
    })
    console.log(response)
  }).catch((err)=>{
    console.log(err)
  })
}