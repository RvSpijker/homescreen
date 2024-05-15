// Check if the browser supports notifications
if (!("Notification" in window)) {
  alert("This browser does not support desktop notification");
}

// Ask the user for permission to show notifications
else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(function (permission) {
    // If the user accepts, schedule the notification for 1 PM
    if (permission === "granted") {
      var now = new Date();
      var oneHourFromNow = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0, 0); // Set time to 1 PM
      
      var timeUntilNotification = oneHourFromNow.getTime() - now.getTime();
      
      // Schedule the notification for 1 PM
      setTimeout(function() {
        var options = {
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAN0yta8AWJPGQA_ulSF3gMXEXS2r3uWBk-fuKkPvrYQ&s', // Replace 'path/to/your/image.png' with the actual path to your image
          body: 'Time to Walk' // Add a body text if needed
        };
        
        var notification = new Notification("Time to Walk!", options);
      }, timeUntilNotification);
    }
  });
}



// Add this JavaScript to handle the settings button functionality
document.getElementById('settingsBtn').addEventListener('click', function() {
  document.getElementById('settingsSlider').classList.toggle('open');
});

// check local storage for wich components to show

// Get the value from local storage
var showSearch = localStorage.getItem('showsearch');
var showLinks = localStorage.getItem('showlinks');
var showTimepercent = localStorage.getItem('showpercent1');
var showWeekendpercent = localStorage.getItem('showpercent2');
var showExcuse = localStorage.getItem('showexcuse1');
var showCalendar = localStorage.getItem('showcalendar1');

if (showSearch === 'false') {
  document.getElementById('search').style.display = 'none';
  document.querySelector('input[name="search"]').checked = false;
}

if (showLinks === 'false') {
  document.getElementById('links').style.display = 'none';
  document.querySelector('input[name="links"]').checked = false;
}

if (showTimepercent === 'false') {
  document.getElementById('percent1').style.display = 'none';
  document.querySelector('input[name="percent1"]').checked = false;
}

if (showWeekendpercent === 'false') {
  document.getElementById('percent2').style.display = 'none';
  document.querySelector('input[name="percent2"]').checked = false;
}

if (showExcuse === 'false') {
  document.getElementById('excuse1').style.display = 'none';
  document.querySelector('input[name="excuse1"]').checked = false;
}

if (showCalendar === 'false') {
  document.getElementById('calendar1').style.display = 'none';
  document.querySelector('input[name="calendar1"]').checked = false;
}

function toggleComponent(component) {
  if (localStorage.getItem('show' + component) === 'false') {
    document.getElementById(component).style.display = 'block';
    localStorage.setItem('show' + component, 'true');
  } else {
    // Toggle the class 'hidden' on the component
    document.getElementById(component).style.display = 'none';
    // Save the value to local storage
    localStorage.setItem('show' + component, 'false');
  }
}




// Add similar event listeners for other components you want to hide


// 

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
  }, 950)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 950)
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

function updateWeekendPercent() {
  // Tijd nu ophalen
  const nu = new Date();

  // Het huidige uur van de dag ophalen
  const huidigUur = nu.getHours();
  const huidigeMinuut = nu.getMinutes();

  // Het huidige dagnummer ophalen (0 voor zondag, 1 voor maandag, ..., 6 voor zaterdag)
  const dagNummer = nu.getDay();

  // Aantal uren van 9:00 tot 17:00
  const urenPerDag = 8;

  // Totaal aantal minuten in een uur
  const totaalMinutenPerUur = 60;

  // Totaal aantal uren in een week
  const totaalUrenPerWeek = 5 * urenPerDag;

  // Bereken het aantal uren tot nu vandaag
  let totaalUrenVandaag = 0;
  if (huidigUur >= 9 && huidigUur < 17) {
      totaalUrenVandaag = huidigUur - 9 + huidigeMinuut / totaalMinutenPerUur;
  } else if (huidigUur >= 17) {
      totaalUrenVandaag = urenPerDag;
  }

  // Bereken het totale aantal uren tot nu deze week
  let totaalUrenDezeWeek = (dagNummer - 1) * urenPerDag; // Omdat de week begint op maandag (dagNummer = 1)
  totaalUrenDezeWeek += totaalUrenVandaag;

  // Bereken het percentage voorbij tot het weekend
  const percentageVoorbij = (totaalUrenDezeWeek / totaalUrenPerWeek) * 100;

  // Update de inner text van het element met id "weekendPercent"
  document.getElementById("weekendpercent").innerText = percentageVoorbij.toFixed() + "%";
}

// Roep de functie aan om de inner text bij te werken wanneer de pagina geladen is
updateWeekendPercent();
setInterval(updateWeekendPercent, 60000); // Update every minute


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
  // Function to generate a random time offset in seconds
  function getRandomTimeOffset() {
    // Set the maximum duration of the video in seconds (1 hour = 3600 seconds)
    var maxDuration = 3600;

    // Generate a random number between 0 and maxDuration
    var randomOffset = Math.floor(Math.random() * maxDuration);

    return randomOffset;
  }

  // Function to update the video URL with a random start time
  function updateVideoURL() {
    var video = document.getElementById('bg');
    var randomOffset = getRandomTimeOffset();
    var videoURL = "https://www.youtube.com/embed/2kCYlUUupyM?mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=2kCYlUUupyM&autoplay=1&start=" + randomOffset;

    video.src = videoURL;
  }

  // Call the function to update the video URL when the page loads
  window.onload = function() {
    updateVideoURL();
  };

  document.getElementById('bg').addEventListener('load', function() {
    setTimeout(function() {
      var placeholderBg = document.querySelector('.placeholder-bg');
      placeholderBg.style.transition = 'opacity 1s ease-in-out'; // Set transition property
      placeholderBg.style.opacity = '0'; // Set opacity to 0 for fadeout effect
      setTimeout(function() {
        placeholderBg.style.display = 'none'; // Hide the placeholder background after fadeout
      }, 1000); // Wait for 1 second before hiding (sync with the transition duration)
    }, 2000); // 2000 milliseconds = 2 seconds
  });
  