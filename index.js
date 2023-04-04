// API KEY -> IFB5kdYEnhqJ4BckAoTULkC2aLPbVKzHeJcSTjiw

// Elements
const imgContainer = document.querySelector('.image-container');
const dateElement = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-form');


function renderUI(data){
    return `
    <h1>Picture On ${data.date}</h1>
    <img src="${data.hdurl}" alt="image of the day from nasa">
    <h3>${data.title}</h3>
    <p>${data.explanation}</p>
    `
}


function getCurrentImageOfTheDay(date){
    const url = "https://api.nasa.gov/planetary/apod";
    const queryParams = {
        date: date,
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

}

function getImageOfTheDay(e){
    e.preventDefault();
    let datePicked = dateElement.value
    console.log('date picked ',datePicked);
    getCurrentImageOfTheDay(datePicked);
}

getCurrentImageOfTheDay('');

// globalEventListener('click', searchButton, getDate);
searchButton.addEventListener('click', getImageOfTheDay);
