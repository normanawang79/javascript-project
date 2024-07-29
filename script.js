document.addEventListener('DOMContentLoaded', () => {
  const movieList = document.querySelector('#movieList');
  const titleInput = document.querySelector('#title');
  const yearInput = document.querySelector('#year');
  const ratingInput = document.querySelector('#rating');
  const genreInput = document.querySelector('#genre');
  const addMovieButton = document.querySelector('#addMovie');

  const apiUrl = 'https://api.example.com/movies'; // Replace with your API URL

  const fetchMovies = async () => {
      try {
          const response = await axios.get(apiUrl);
          const movies = response.data;
          movieList.innerHTML = '';
          movies.forEach(movie => {
              const li = document.createElement('li');
              li.className = 'list-group-item';
              li.innerHTML = `
                  <span>${movie.title} (${movie.year}) - ${movie.rating} - ${movie.genre}</span>
                  <div>
                      <button class="btn btn-warning btn-sm edit" data-id="${movie.id}">Edit</button>
                      <button class="btn btn-danger btn-sm delete" data-id="${movie.id}">Delete</button>
                  </div>
              `;
              movieList.appendChild(li);
          });
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  const addMovie = async () => {
      const newMovie = {
          title: titleInput.value,
          year: yearInput.value,
          rating: ratingInput.value,
          genre: genreInput.value
      };

      try {
          const response = await axios.post(apiUrl, newMovie);
          const movie = response.data;
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.innerHTML = `
              <span>${movie.title} (${movie.year}) - ${movie.rating} - ${movie.genre}</span>
              <div>
                  <button class="btn btn-warning btn-sm edit" data-id="${movie.id}">Edit</button>
                  <button class="btn btn-danger btn-sm delete" data-id="${movie.id}">Delete</button>
              </div>
          `;
          movieList.appendChild(li);
          titleInput.value = '';
          yearInput.value = '';
          ratingInput.value = '';
          genreInput.value = '';
      } catch (error) {
          console.error('Error adding movie:', error);
      }
  };

  const deleteMovie = async (id) => {
      try {
          await axios.delete(`${apiUrl}/${id}`);
          const movieItem = document.querySelector(`.delete[data-id="${id}"]`).parentElement.parentElement;
          movieItem.remove();
      } catch (error) {
          console.error('Error deleting movie:', error);
      }
  };

  movieList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
          const id = e.target.dataset.id;
          deleteMovie(id);
      } else if (e.target.classList.contains('edit')) {
          const id = e.target.dataset.id;
          // Handle edit functionality here
          console.log(`Edit movie with id ${id}`);
      }
  });

  addMovieButton.addEventListener('click', addMovie);
  fetchMovies();
});