var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime () {
  var now = new Date
  
  var lastHours = last.getHours().toString()
  var nowHours = now.getHours().toString()
  if (lastHours !== nowHours) {
    updateContainer(hoursContainer, nowHours)
  }
  
  var lastMinutes = last.getMinutes().toString()
  var nowMinutes = now.getMinutes().toString()
  if (lastMinutes !== nowMinutes) {
    updateContainer(minutesContainer, nowMinutes)
  }
  
  var lastSeconds = last.getSeconds().toString()
  var nowSeconds = now.getSeconds().toString()
  if (lastSeconds !== nowSeconds) {
    //tick()
    updateContainer(secondsContainer, nowSeconds)
  }
  
  last = now
}

function tick () {
  tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer (container, newTime) {
  var time = newTime.split('')
  
  if (time.length === 1) {
    time.unshift('0')
  }
  
  
  var first = container.firstElementChild
  if (first.lastElementChild.textContent !== time[0]) {
    updateNumber(first, time[0])
  }
  
  var last = container.lastElementChild
  if (last.lastElementChild.textContent !== time[1]) {
    updateNumber(last, time[1])
  }
}

function updateNumber (element, number) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number
  
  element.appendChild(second)
  element.classList.add('move')

  setTimeout(function () {
    element.classList.remove('move')
  }, 990)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 990)
}

setInterval(updateTime, 100)

// 

function updatePercentage() {
  // Get current time
  var now = new Date();
  
  // Set start and end times (9:00 and 17:00)
  var start = new Date();
  start.setHours(9, 0, 0, 0); // 9:00 AM
  var end = new Date();
  end.setHours(17, 0, 0, 0); // 5:00 PM
  
  // Calculate total time in milliseconds
  var totalTime = end - start;
  
  // Calculate time elapsed since 9:00 AM in milliseconds
  var elapsedTime = now - start;
  
  // Calculate percentage
  var percentage = (elapsedTime / totalTime) * 100;
  
  // Round the percentage to a whole number
  percentage = Math.round(percentage);
  
  // Update the element with id "timepercent"
  document.getElementById("timepercent").innerText = percentage + "%";
}

// Call the function initially to update the percentage
updatePercentage();

// Set interval to update the percentage every minute
setInterval(updatePercentage, 60000); // Update every minute

// 

fetch('https://api.devexcus.es/')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        const excuse = data.text; // Get the excuse from the JSON data
        
        // Update the content of the 'excuse' div with the fetched excuse
        document.getElementById('excuse').innerText = excuse;
    })
    .catch(error => {
        console.error('Error fetching excuse:', error);
    });

// 

// Array of background image URLs
const backgrounds = [
  "https://store-images.s-microsoft.com/image/apps.24270.13847644057609868.a4a91f76-8d1c-4e19-aa78-f4d27d2818fb.d96146d7-d00a-4db9-ad68-197b2f962a17",
  "https://i.pinimg.com/originals/e4/e9/a1/e4e9a1e974e80fd3919c609b5cbc4fc7.jpg",
  "https://c4.wallpaperflare.com/wallpaper/296/96/958/hollow-knight-quirrel-hollow-knight-hd-wallpaper-preview.jpg",
  "https://i.pinimg.com/736x/ab/a1/fe/aba1fe00d1d1204a4761ceac6af380e9.jpg",
  "https://wallpapercave.com/wp/wp2852206.jpg",
];

// Function to pick a random background
function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const randomBackground = backgrounds[randomIndex];
  document.querySelector('.random-background').style.backgroundImage = `url(${randomBackground})`;
}

// Set initial random background
setRandomBackground();