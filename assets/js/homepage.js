//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let searchBtn2 = document.getElementById("search-btn-two")
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let endpointURLSpoonacular = "https://api.spoonacular.com/food/ingredients/substitutes?";
let appKeySpoon = "1b359d0128f940919c6585bbcb7e80c1";

function searchHistory(q) {
  console.log(q);
  // get items from local storage, if there are nothing in local storage set to empty array, need JSON parsing it from a string
  var searchedIngredients = JSON.parse(localStorage.getItem('ingredients-list')) || [];
  // pushing new values to the array
  searchedIngredients.push(q);
  // reset local history, JSON to put it in back to string in local storage
  localStorage.setItem('ingredients-list', JSON.stringify(searchedIngredients));
  renderSearchHistory();

}


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
        
        var queryURLSpoonacular = endpointURLSpoonacular + "apiKey=" + appKeySpoon + "&ingredientName=";
        fetch(queryURLSpoonacular) // wait for this fetch to finish
            .then(function (response) {
                return response.json();
              
              })
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });


  };
})
 
 searchBtn2.addEventListener("click", () =>{

})