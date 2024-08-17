const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "652e334254105e766fc35326";
const MASTER_KEY = "$2a$10$EZfkhAp55cb1nD3GBqXbaeHPg.9VYRj2u4mWKFwEIbVtER1wGdiNy";


function addMovie(movies, title, year, rating, genre) {
  let newMovie = {
    id: Math.floor(Math.random() * 100 + 1),
    title: title,
    year: year,
    rating: rating,
    genre: genre
  };
  movies.push(newMovie);
}

function modifyMovie(movies, id, newTitle, newYear, newRating, newGenre) {
  let movie = null;
  for (let m of movies) {
    if (m.id == id) {
      movie = m;
    }
  }
  if (movie) {
    movie.title = newTitle;
    movie.year = newYear;
    movie.rating = newRating;
    movie.genre = newGenre;
  } else {
    console.log("Movie is not found");
  }
}

function deleteMovie(movies, id) {
  let indexToDelete = null;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    movies.splice(indexToDelete, 1);
  } else {
    console.log("Movie is not found");
  }
}

async function loadMovies() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
  return response.data.record;
}

async function saveMovies(movies) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, movies, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    }
  });
  return response.data;

}











 
