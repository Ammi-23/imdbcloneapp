
async function favList(){
    const listContainer = document.querySelector(".movies-grid");
    //fetch the data from local storage
    const movieArray=JSON.parse(localStorage.getItem("movielist"));
    listContainer.innerHTML="";
    //traverse the element in the array
    for (i=0;i<movieArray.length;i++){
        //display the data/movies in the container
        listContainer.innerHTML+=`
                <div class="card" id="${movieArray[i].imdbID}">
                    <div class="img">
                        <img src="${movieArray[i].Poster}" alt="${movieArray[i].Title}"></a>
                    </div>
                    <div class="info">
                        <h2>${movieArray[i].Title}</h2>
                        <button type="submit" class="delete" onclick="removeMovie(${movieArray[i].imdbID})">Remove</button>
                    </div>
                </div>    `;
    }

}
//function to remove the movie from local storage and from display
async function removeMovie(data){
    //created new list and filter the data
    let myFavList= JSON.parse(localStorage.getItem("movielist"));
    myFavList=myFavList.filter((e)=>e.imdbID!== data.id);
    localStorage.setItem("movielist",JSON.stringify(myFavList));
    window.location.reload();
}

favList();