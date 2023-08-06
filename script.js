//OMDb API: https://www.omdbapi.com/?i=tt3896198&apikey=7f618ea5
//key: 7f618ea5

//access the element and store in the variable
const input = document.querySelector('.search-input'); 
const mainContainer = document.querySelector('.movies-grid');

let movieList=[]; 
     
// fetch the list of data/movies from OMDb API as per the input in search tab
async function getMovieData (movieName) {
    const resp = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=7f618ea5&s=${movieName}`)
    const data = await resp.json() // to change to the JSON object
    return data.Search
}

//event listener for input on search tab
input.addEventListener('keyup', displayMoviesToDom );

//display the list of movies on screen
async function displayMoviesToDom () {
    const movieName= input.value; //store the input in variable 
    const data = await getMovieData(movieName);//get the list of movie objects 
    // it will remove the previous search data
    if(!movieName){
        mainContainer.innerHTML="";
    }
    //else it will display the card list in the main section
    mainContainer.innerHTML = data.map(e =>{
        return `
             <div class="card">
                 <div class="img"><a href="moviePage.html?id=${e.imdbID}" >
                     <img src="${e.Poster}" id="${e.imdbID}" alt="${e.Title}"></a>
                </div>
                <div class="info">
                    <h2>${e.Title}</h2>
                    <button class= "favourite"><i class="fa fa-heart" id="${e.imdbID}"></i></button>
                </div>
            </div>
         `; 
    })
    const icon=document.querySelectorAll('.favourite');
    addClickEffect(icon);// function for heart icon 
} 

//event listener for heart icon
function addClickEffect(icon) {
    icon.forEach(icon => {
        icon.addEventListener('click',addToFav)})
}


// add to the favorite list on click
async function addToFav(e){
    //when clicked on heart icon the movie id is store in the variable
    const target=e.target.id;
    //fetch the movie detail by Id
    const resp = await fetch(`https://www.omdbapi.com/?i=${target}&apikey=7f618ea5`)
    const data = await resp.json()
    const movieList=JSON.parse(localStorage.getItem("movielist"))||[];
    //to check if movie is already added to favourite list
    let isPresent = false;
    movieList.forEach((movie) => {
      if (data.Title == movie.Title) {
        alert("already added to fav list");// if movie is already added, it will show the notification
        isPresent = true;
      }
    });
    // if not added, it will add the movie detail in the local storage
    if (!isPresent) {
        movieList.push(data)
    }
    //created a list and stored in local storage
    localStorage.setItem("movielist", JSON.stringify(movieList));

} 



//function to handle the click event
async function handleClickEvent(e){
    let target=e.target;
    // clear the previous data store in local storage for movieinformation
    localStorage.removeItem("movieinformation");
    localStorage.setItem("movieinformation", target.id);// to store the id
}
// event listener for whole DOM
document.addEventListener('click',handleClickEvent)

