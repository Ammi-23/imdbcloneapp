 
function movieDetail() {
    const container= document.querySelector(".main-container");
    const search = localStorage.getItem("movieinformation");

    fetchMovies(search);
    // function to fetch the movie detail by id and display
    async function fetchMovies(id) {
        const resp = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=7f618ea5&type=movie`)
        const data = await resp.json()
        //display of the movie detail in main container
        container.innerHTML=`
                <div id="title">
                    <h3>${data.Title}</h3>
                </div>
                <div class="movie-div">
                    <div class="movie-card">
                        <img id="poster" src="${data.Poster}"/>
                    </div>
                    <div class="description-div">
                        <div class="detail">
                            <h5 class="card-title">Plot</h5>
                            <p class="card-text" id="plot">${data.Plot}</p>
                            <div>
                                <p class="info-type">Directors :<span id="director-names" class="information">${data.Director}</span>
                                </p>
                                <p class="info-type">Cast :<span id="cast-names" class="information">${data.Actors}</span>
                                </p>
                                <p class="info-type">Genre :<span id="genre" class="information">${data.Genre}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        
    }
 }

movieDetail();