document.getElementById('searchButton').addEventListener('click', function() {
    const ingredient = document.getElementById('ingredientInput').value;
    const apiKey = 'your_api_key';  // Replace with your recipe API key
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recipeResults = document.getElementById('recipeResults');
            recipeResults.innerHTML = '';  // Clear any previous results

            data.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <p>Used ingredients: ${recipe.usedIngredientCount}</p>
                    <p>Missing ingredients: ${recipe.missedIngredientCount}</p>
                `;
                recipeResults.appendChild(recipeCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Could not fetch recipes. Please try again.');
        });
});
