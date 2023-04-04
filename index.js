// API KEY -> IFB5kdYEnhqJ4BckAoTULkC2aLPbVKzHeJcSTjiw

// Elements
const imgContainer = document.querySelector('.image-container');
const dateElement = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-form');
const ulElement = document.querySelector('.ul-searches');


let datesArr = [];
if(localStorage.getItem('dates')){
    datesArr = localStorage.getItem('dates');
}
else{
    localStorage.setItem('dates', JSON.stringify(datesArr));
}
datesArr = JSON.parse(localStorage.getItem('dates'));


function renderUI(data){
    return `
    <h1>Picture On ${data.date}</h1>
    <img src="${data.hdurl}" alt="image of the day from nasa">
    <h3>${data.title}</h3>
    <p>${data.explanation}</p>
    `
}


function getCurrentImageOfTheDay(date = ''){
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

function renderPreviousSearch(date){
    return `
    <li><button class="previous">${date}</button></li>
    `

}

function addSearchToHistory(){
    ulElement.innerHTML = "";
    datesArr.forEach((date) => {
        ulElement.innerHTML += renderPreviousSearch(date);
    })
}


function saveSearch(dateToSave){
    if(dateToSave){
        datesArr.push(dateToSave);
        localStorage.setItem('dates', JSON.stringify(datesArr));
    }
    
}


function getImageOfTheDay(e){
    e.preventDefault();
    let datePicked = dateElement.value
    console.log('date picked ',datePicked);
    getCurrentImageOfTheDay(datePicked);
    saveSearch(datePicked);
    addSearchToHistory();
    
}

getCurrentImageOfTheDay();


function globalEventListener(type, selector, callback){
    document.addEventListener(type, e => {
        if(e.target.matches(selector)) callback(e);
    })
}

function showPrevious(e){
    let date = e.target.textContent;
    getCurrentImageOfTheDay(date);

}


searchButton.addEventListener('click', getImageOfTheDay);
globalEventListener('click', '.previous', showPrevious);