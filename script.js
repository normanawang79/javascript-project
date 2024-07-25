document.addEventListener('DOMContentLoaded', function() {

    async function main() {
      let movies = await loadMovies();
  
      const addMovieButton = document.querySelector("#addMovie");
      addMovieButton.addEventListener('click', function() {
        let movieTitleInput = document.querySelector("#movieTitle")
        movieTitle = movieTitleInput.value;
        
        let movieYearInput = document.querySelector("#movieYear")
        movieYear = movieYearInput.value;
       
  
        if (movieTitle) {
          addMovie(movies, movieTitle, movieYear, movieRating, movieGenre);
          renderMovies(movies);
          movieTitleInput.value = '';
        }
      });
  
      const saveButton = document.querySelector("#save-btn");
      saveButton.addEventListener("click", async function() {
        saveMovies(movies);
      })
  
  
      // add three todos
      renderMovies(movies);
    }
  
  
    function renderMovies(movies) {
      movieList.innerHTML = '';
      for (let movie of movies) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                  ${todo.name} <span class="badge  bg-primary">${todo.urgency}</span>
                  <button class="btn edit-btn btn-success btn-sm">Edit</button>
                  <button class="btn delete-btn btn-danger btn-sm">Delete</button>
                  
              `;
  
        todoList.appendChild(li);
  
        // select the edit button which we just created
        li.querySelector(".edit-btn").addEventListener('click', function() {
          const newName = prompt("Enter the new task name: ", todo.name);
          const newUrgency = prompt("Enter the new urgency:", todo.urgency);
          modifyTask(todos, todo.id, newName, newUrgency);
          renderTodos(todos);
        });
  
        // allow deleting
        li.querySelector(".delete-btn").addEventListener('click', function() {
          const confirmation = confirm("Do you want to delete the task: " + todo.name + "?");
          if (confirmation) {
            deleteTask(todos, todo.id);
            renderTodos(todos);
          }
        });
  
      }
    }
  
    main();
  });
  