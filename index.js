const quoteContainer = document.getElementById("quoteContainer")
const quoteText = document.getElementById("quoteText")
const quoteAuthor = document.getElementById("quoteAuthor")
const locationText = document.getElementById("location")
const timeDisplay = document.getElementById("time")
const timezoneCodeDisplay = document.getElementById("timezoneCode")
const infoBtn = document.getElementById("infoBtn")
const btnText = document.getElementById("btnText")
const btnImg = document.getElementById("btnImg")
const greetingText = document.getElementById("greetingText")
const refreshBtn = document.getElementById("refreshBtn")
const moreInfoContainer = document.getElementById("moreInfoContainer")
const grid= document.getElementById("grid")
const timezoneText= document.getElementById("timezoneText")
const dayYearText = document.getElementById("dayYearText")
const dayWeekText = document.getElementById("dayWeekText")
const weekText = document.getElementById("weekText")

const sunPath = "./assets/desktop/icon-sun.svg"
const moonPath = "./assets/desktop/icon-moon.svg"


let hours
let minutes
let isShowing = false
let bgToShow ="daytime"

const checkWidth = ()=>{
    if(window.innerWidth>= 600 && window.innerWidth< 1000){
        document.body.style.background = `url(./assets/tablet/bg-image-${bgToShow}.jpg)`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundRepeat = "no-repeat"
    }else if(window.innerWidth>= 1000){
        document.body.style.background =`url(./assets/desktop/bg-image-${bgToShow}.jpg)`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundRepeat = "no-repeat"
    }else{
        document.body.style.background =`url(./assets/mobile/bg-image-${bgToShow}.jpg)`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundRepeat = "no-repeat"

    }
}

const displayInfo = ()=>{
    isShowing =!isShowing

    if(isShowing){
        grid.style.gridTemplateRows ="1fr 1fr"
        btnText.innerText ="less"
        btnImg.className="fa-solid fa-chevron-up"
        quoteContainer.classList.add("hidden")
        moreInfoContainer.classList.remove("hidden")
    }else if(isShowing == false){
        grid.style.gridTemplateRows ="2fr .5fr"
        btnText.innerText ="more"
        btnImg.className="fa-solid fa-chevron-down"
        quoteContainer.classList.remove("hidden")
        moreInfoContainer.classList.add("hidden")
    }
}

const displayQuote= (data) =>{
    quoteText.innerText = `"${data.content}"`
    quoteAuthor.innerText = data.author
}

const getQuote= ()=>{
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => displayQuote(data));
}

const displayTime = (data) =>{
    dayYearText.innerText = data.day_of_year
    dayWeekText.innerText = data.day_of_week
    weekText.innerText = data.week_number
    const time = new Date(data.datetime)
    hours = time.getHours()
    minutes = time.getMinutes()

    if( hours>= 5 && hours< 12){
        bgToShow ="daytime"
        checkWidth()
        greetingText.innerHTML =`
        <img src=${sunPath} alt="sun">
        <span>good morning, it´s currently</span>
        ` 
    }else if(hours>= 12 && hours< 18){
        bgToShow ="daytime"
        checkWidth()
        greetingText.innerHTML =`
        <img src=${sunPath} alt="sun">
        <span>good afternoon, it´s currently</span>
        ` 
    }else if(hours>= 18 || hours<= 5){
        bgToShow ="nighttime"
        checkWidth()
        greetingText.innerHTML =`
        <img src=${moonPath} alt="moon">
        <span>good evening, it´s currently</span>
        ` 
    }
    timeDisplay.innerText = `${hours}:${minutes<10? `0${minutes}`:`${minutes}`}` 
    timezoneCodeDisplay.innerText= data.abbreviation
}

const getCurrentTime = (data)=>{
    fetch(`https://worldtimeapi.org/api/timezone/${data.data.timezone.id}`)
        .then(response => response.json())
        .then(data => displayTime(data));
}


const displayLocationData = (data)=>{
    locationText.innerText = `in ${data.data.location.region.name}, ${data.data.location.country.alpha2}`
    timezoneText.innerText = data.data.timezone.id

    let timer = setInterval( ()=> getCurrentTime(data),1000)
    
}


getQuote()

refreshBtn.addEventListener("click", getQuote)
infoBtn.addEventListener("click",displayInfo)

fetch("https://api.ipbase.com/v2/info?apikey=A22yM8XNZPL7sPcyQzzaTp1gCeOPtOeYBFEqY4zD&ip")
    .then(response => response.json())
    .then(data => displayLocationData(data));

