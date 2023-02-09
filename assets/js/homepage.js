//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let searchBtn2 = document.getElementById("search-btn-two")
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let endpointURL = "https://api.edamam.com/search?";
let appKey = "d14cacb88d41dac2fa92c1fd535a40c6";
let appID = "297b61f7";

//Excute MealDB API search once button is clicked
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let count = 1;
        let instructions = [];
        for (let i in myMeal) {
          let instruction = "";
          let measure = "";
          if (i.startsWith("strInstructions") && myMeal[i]) {
            instruction = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            instructions.push(`${measure} ${instruction}`);
          }
        }
        //Displays the results from the MealDB API
        let img = document.querySelector("img")
        img.src = myMeal.strMealThumb
        document.getElementById('meal').innerHTML = (myMeal.strMeal);
        document.getElementById('area').innerHTML = (myMeal.strArea);
        document.getElementById('instructions').innerHTML = (myMeal.strInstructions);
        
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  };
})

  function getAPI(event) {
    event.preventDefault();
    let q = document.getElementById("user-inp").value;
    let queryURL = endpointURL + "q=" + q + "&app_id=" + appID + '&app_key=' + appKey; 
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
          console.log(data)        
        let recipeServes = document.getElementById("results-div");
        recipeServes.innerHTML = ` 
        <h1> Calories of recipe </h1>
        <h3> ${data.hits[0].recipe.calories} </h3>`;
        });
      }


searchBtn2.addEventListener("click", getAPI);
