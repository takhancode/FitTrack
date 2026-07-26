const nutritionForm = document.getElementById('nutritionForm');
const nutritioninput = document.getElementById('nutritionInput');
const nutritionResults = document.getElementById('nutritionResults');

nutritionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = nutritioninput.value.trim();

    if (query === '') {
        alert('Please enter a food item.');
        return;
    }

     // Show a loading message while we fetch
    nutritionResults.innerHTML = "<p class='nutrition-loading'>Searching...</p>";
    
    try {
        const url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=" +
            encodeURIComponent(query) +
            "&search_simple=1&action=process&json=1&page_size=6";
            
        const response = await fetch(url);
        const data = await response.json();

         displayResults(data.products);

    }
    catch (error) {
        nutritionResults.innerHTML = "<p class='nutrition-loading'>Something went wrong. Please try again.</p>";
        console.log(error);
    }

});


function displayResults(products) {
    nutritionResults.innerHTML = "";

    if (!products || products.length === 0) {
        nutritionResults.innerHTML = "<p class='nutrition-loading'>No results found. Try a different food.</p>";
        return;
    }

     // Only keep products that actually have a name and calorie data
    const validProducts = products.filter(function (p) {
        return p.product_name && p.nutriments && p.nutriments["energy-kcal_100g"] !== undefined;
    });

    if (validProducts.length === 0) {
        nutritionResults.innerHTML = "<p class='nutrition-loading'>No detailed results found. Try a different food.</p>";
        return;
    }

    validProducts.forEach(function (product) {
        const name = product.product_name;
        const kcal = Math.round(product.nutriments["energy-kcal_100g"] || 0);
        const protein = (product.nutriments["proteins_100g"] || 0).toFixed(1);
        const carbs = (product.nutriments["carbohydrates_100g"] || 0).toFixed(1);
        const fat = (product.nutriments["fat_100g"] || 0).toFixed(1);

        const card = document.createElement("div");
        card.className = "nutrition-card";

        card.innerHTML =
            "<h3>" + name + " (100g)</h3>" +
            "<div class='nutrition-card__grid'>" +
                "<div><span>" + kcal + "</span>kcal</div>" +
                "<div><span>" + protein + "g</span>protein</div>" +
                "<div><span>" + carbs + "g</span>carbs</div>" +
                "<div><span>" + fat + "g</span>fat</div>" +
            "</div>";

        nutritionResults.appendChild(card);
    });
}