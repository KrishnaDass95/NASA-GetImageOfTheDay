console.log('NASA test');
// API KEY -> IFB5kdYEnhqJ4BckAoTULkC2aLPbVKzHeJcSTjiw

// Elements
const imgContainer = document.querySelector('.image-container');


function renderUI(data){
    return `
    <h1>Picture On ${data.date}</h1>
    <img src="${data.hdurl}" alt="image of the day from nasa">
    <h3>${data.title}</h3>
    <p>${data.explanation}</p>
    `
}


const url = "https://api.nasa.gov/planetary/apod";
const queryParams = {
    date: '',
    api_key: 'IFB5kdYEnhqJ4BckAoTULkC2aLPbVKzHeJcSTjiw'
}

const queryString = new URLSearchParams(queryParams).toString();
console.log("query string", queryString);

fetch(`${url}?${queryString}`)
    .then(response => response.json())
    .then(data => {
        console.log("api requested data -> ",data);
        imgContainer.innerHTML = renderUI(data);
    })
    .catch((error) =>  console.log(error))

