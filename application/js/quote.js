/**
 * Title: quote.js
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Reference web page: 1. https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373
 *                     2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *                     3. https://stackoverflow.com/questions/51603016/why-is-math-floor-needed-to-generate-a-random-number-between-x-and-y 
 * Purpose: Display a quote. Once the page reloaded then it will display new quote.
 */

window.addEventListener("load", function(){

    // Select Element
    const quoteText = document.querySelector(".quote__text");
    const quoteAutor = document.querySelector(".quote__author");
    
    // activate quote section
    getQuote();

    // create random index number
    function randomItem(a) {
        // Math.radom() function returns a floating-point, random number in the range 0-1(inclusive of 0)
        // it needs floor() method
        return a[Math.floor(Math.random() * a.length)];
    }

    // Ajax, using fetch() method
    function getQuote() {
        let QUOTE_URL = "https://type.fit/api/quotes"
        fetch(QUOTE_URL) // Once I put options { credentials: 'include'} then it doesn't work.
            .then(response => response.json())
            .then(function (data) {
                const random = randomItem(data);
                const author = random.author;
                const text = random.text;
                quoteText.innerText = `${text}`;
                quoteAutor.innerText = `- ${author} -`;
            });
    }
})

