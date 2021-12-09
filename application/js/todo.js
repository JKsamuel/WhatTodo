/**
 * Title: todo.js
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Reference web page: 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
 *                     2. https://www.geeksforgeeks.org/javascript-ternary-operator/ 
 *                     3. https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp 
 * Purpose: Display Todo list form.
 *          User can input what to do.
 *          User input information will be stored in local storage.
 *          According to W3schools, the localStorage object sotred data with no expiration date.
 *          and the data will not be deleted when the browser is closed, and will be available the next day, wee, or year.
 *          Otherwise, sessionStorage is kind of temporary storage.
 *          So, in this case, I thought that it was appropriate to use local storage.
 */

window.addEventListener("load", function(){
    // Select Element
    const clear = document.querySelector(".clear-btn");
    const dateElement = document.querySelector(".toDo__date");
    const list = document.querySelector(".toDo__list");
    const input = document.querySelector(".toDo__input");

    // Classes names
    const CHECK = "radio-button-on-outline";
    const UNCHECK = "radio-button-off-outline";
    const LINE_THROUGH = "lineThrough";

    // Declare Variables 
    let List, id;

    // get the item from Local storage
    let data = localStorage.getItem("TODO");

    // check if loaclStorage is not empty
    if (data) {
        List = JSON.parse(data);
        id = List.length;
        loadList(List);
    } else {
        List = [];
        id = 0;
    }

    // clear the List
    clear.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
    })

    // load items on the interface
    function loadList(array) {
        array.forEach(function (item) {
            addToDo(item.name, item.id, item.done, item.trash)
        });
    }

    // Showing Date
    const today = new Date();
    const option = {
        weekday: "long",
        month: "short",
        day: "numeric"
    }
    dateElement.innerText = today.toLocaleDateString("en-us", option);

    // add to do
    function addToDo(toDo, id, done, trash) {
        if (trash) {
            return;
        }
        // Use conditional operator(this is so cool I think)
        // Reference: 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
        //            2. https://www.geeksforgeeks.org/javascript-ternary-operator/
        const DONE = done ? CHECK : UNCHECK;
        const LINE = done ? LINE_THROUGH : "";

        // Reference: https://ionic.io/ionicons/usage
        const item = `<li class="toDo__list-items">
                        <ion-icon name="${DONE}" class="${DONE} list-icon" id="${id}" job="complete"></ion-icon>
                        <p class="toDo__list-text ${LINE}">${toDo}</p>
                        <ion-icon name="trash" class="toDo-del" id="${id}" job="delete"></ion-icon>
                    </li>
                    `;
        // position will be a first parameter of insertAdjacentHTML, "beforeend" - Before the end of the element(as the last child)
        const position = "beforeend";
        // insertAdjacentHTML() method inserts a text as HTML, into a specified position.
        // Reference: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
        list.insertAdjacentHTML(position, item);
    }

    // add an item to the list if user hits enter 
    function handleSubmit(event) {
        if (event.keyCode == 13) {
            const toDo = input.value;

            // if input isn't empty
            if (toDo) {
                addToDo(toDo, id, false, false);
                List.push({name: toDo, id: id, done: false,trash: false})

                // add item to the Local storage
                localStorage.setItem("TODO", JSON.stringify(List));
                id++;
            }
            input.value = "";
        }
    }

    input.addEventListener("keyup", handleSubmit);

    // complete to do
    function completeToDo(element) {
        if (element.attributes.name.value === CHECK) {
            element.setAttribute("name", UNCHECK)
        } else if (element.attributes.name.value === UNCHECK) {
            element.setAttribute("name", CHECK)
        };
        // make line-through on the completed row
        element.parentNode.querySelector(".toDo__list-text").classList.toggle(LINE_THROUGH);

        List[element.id].done = List[element.id].done ? false : true;
    }

    // remove to do
    function removeToDo(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        List[element.id].trash = true;
    }

    // check complete or delete target item
    list.addEventListener("click", function () {
        const element = event.target;
        const elementJOB = element.attributes.job.value;

        if (elementJOB === "complete") {
            completeToDo(element);
        } else if (elementJOB === "delete") {
            removeToDo(element);
        }
        // add item to Local Storage
        localStorage.setItem("TODO", JSON.stringify(List));
    })
})