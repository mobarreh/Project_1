//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

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
  }
});
