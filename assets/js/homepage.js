//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
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
        console.log(instructions);

        result.innerHTML =`
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div>
        <p id="instructions">${myMeal.strInstructions}</p>
    </div>`;

  })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});
