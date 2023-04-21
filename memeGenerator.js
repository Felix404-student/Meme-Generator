/*
Author: Justin Brown
Assignment: "Meme Generator" for UMass/Springboard Bootcamp
For this assignment, you’ll be building a meme generator in the browser using HTML, CSS, and JavaScript.
Your generator should consist of a form that accepts a link to an image, text for the top of the meme, 
and text for the bottom of the meme. When the user submits the form, use JavaScript to append to the DOM 
a div which contains the meme, including the image and its text.
Requirements:
    User should be able to submit a form on the page to generate a new meme on the page, and should be able 
        to add multiple memes to the page by submitting the form multiple times.
    Users should be able to click on a button to remove a meme from the page.
    When the meme form is submitted, values in the form inputs should be cleared.
    Be sure to style your meme generator! It should be functional but also look nice.
    Only use vanilla JavaScript only: no frameworks/third-party libraries.
*/

const form = document.querySelector("form");
const memeSpace = document.querySelector("section");

// turns the input strings into a div
function generate (imgURL, topText, bottomText) {

    // check for invalid URL (breaks things)
    try { 
        new URL(imgURL);
    } catch (e){
        alert("Invalid URL");
        return;
    }

    // crete div to hold image and text
    let newDiv = document.createElement("div");
    newDiv.classList.add("memeContainer");
    newDiv.innerHTML = "<img alt=\"meme\" src=\""+imgURL+"\" width=\"250\" height=\"250\">";

    // top text
    let topDiv = document.createElement("p");
    topDiv.innerText = topText;
    topDiv.classList.add("topText");
    topDiv.classList.add("memeText");
    newDiv.prepend(topDiv);

    // bottom text
    let botDiv = document.createElement("p");
    botDiv.innerText = bottomText;
    botDiv.classList.add("bottomText");
    botDiv.classList.add("memeText");
    newDiv.append(botDiv);

    // and adds it to the page
    memeSpace.append(newDiv);
}

// keeps from trying to reference objects that don't exist yet
document.addEventListener("DOMContentLoaded", function(){ 

    // event for submitting the text boxes
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let imgURL = document.querySelector('#inputURL').value;
        let topText = document.querySelector('#inputText1').value;
        let bottomText = document.querySelector('#inputText2').value;

        // empty string check
        if (imgURL === '') {
            return;
        }

        // prevents HTML injection
        imgURL = imgURL.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        topText = topText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        bottomText = bottomText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        generate(imgURL, topText, bottomText);
        form.reset();
    });

    // delete generated meme on click
    memeSpace.addEventListener("dblclick", function(e) {
        if (e.target.tagName === "DIV") {
            e.target.remove();
        }
        if (e.target.tagName === "p" | e.target.tagName === "IMG") {
            e.target.parentElement.remove();
        }
    });

});