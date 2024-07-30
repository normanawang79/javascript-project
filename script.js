document.addEventListener('DOMContentLoaded', function() {

  async function main() {
    let movies = await loadMovies();

    const addMovieButton = document.querySelector("#addMovie");
    addMovieButton.addEventListener('click', function() {
      const movieTitleInput = document.querySelector("#movieTitle")
      const movieTitle = movieTitleInput.value;

      const movieYearInput = document.querySelector("#movieYear")
      const movieYear = movieYearInput.value;

      const movieRatingInput = document.querySelector("#movieRating")
      const movieRating = movieRatingInput.value;


      const movieGenreSelect = document.querySelector("#movieGenre");
      const movieGenre = movieGenreSelect.value;

      if (movieTitle) {
        addMovie(movies, movieTitle, movieYear, movieRating, movieGenre);
        renderMovies(movies);
        movieTitleInput.value = "";
      }
    });

    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", async function() {
      saveMovies(movies);
    })


    // add three movies
    renderMovies(movies);
  }


  function renderMovies(movies) {
    movieList.innerHTML = '';
    for (let movie of movies) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
                ${movie.title} <span class="badge  bg-primary">${movie.year}</span><span class="badge  bg-primary">${movie.rating}</span><span class="badge  bg-primary">${movie.genre}</span>
                <button class="btn edit-btn btn-success btn-sm">Edit</button>
                <button class="btn delete-btn btn-danger btn-sm">Delete</button>
                
            `;

      movieList.appendChild(li);

      // select the edit button which we just created
      li.querySelector(".edit-btn").addEventListener('click', function() {
        const newTitle = prompt("Enter the new movie title: ", movie.title);
const newYear = prompt("Enter the new movie year: ", movie.year);
const newRating = prompt("Enter the new movie rating: ", movie.rating);
        const newGenre = prompt("Enter the new genre:", movie.genre);

        modifyMovie(movies, movie.id, newTitle, newYear, newRating, newGenre);
        renderMovies(movies);
      });

      // allow deleting
      li.querySelector(".delete-btn").addEventListener('click', function() {
        const confirmation = confirm("Do you want to delete the movie: " + movie.title + "?");
        if (confirmation) {
          deleteMovie(movies, movie.id);
          renderMovies(movies);
        }
      });

    }
  }

  main();
});
