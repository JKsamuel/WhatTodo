/**
 * Title: clock.js
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Reference web page: 1. https://www.w3schools.com/js/js_date_methods.asp
 * Purpose: Display the clock on the top of the right side of the application
 */
window.addEventListener("load", function(){
    // Select Element
    const clockSpan = document.querySelectorAll(".js-clock");

    // initiate the clock
    getTime();
    setInterval(getTime, 1000);

    function getTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = `${hours < 10 ? `0${hours}`: hours} : ${
                        minutes < 10 ? `0${minutes}` : minutes}`;
        for (var i = 0; i < clockSpan.length; i++) {
            clockSpan[i].innerText = `${time}`;
        }
    }
})
