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

// 

const inputField = document.getElementById('inputField');
const savedValue = localStorage.getItem('inputFieldValue');

if (savedValue) {
  inputField.value = savedValue;
}

  inputField.addEventListener('input', function() {
    localStorage.setItem('videolink', inputField.value);
    updateVideoURL();
  });

  // Function to update the video URL with a random start time
  function updateVideoURL() {
    var video = document.getElementById('bg');
    var randomOffset = getRandomTimeOffset();
    if (localStorage.getItem('videolink') === undefined) {
    var videourl = "2kCYlUUupyM";
    } else { 
      var videourl = localStorage.getItem('videolink');
      var splited = videourl.split("v=");
      var splitedAgain = splited[1].split("&");
      var videoId = splitedAgain[0];
    }
    var videoURL = "https://www.youtube.com/embed/" + videoId + "?mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=" + videoId + "&autoplay=1&start=" + randomOffset;

    video.src = videoURL;
  }

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



        // Variables for time units
        var days, hours, minutes, seconds;
        var countdown = document.getElementById("countdown");
        var interval;

        // Function to set the target date
        function setTargetDate() {
            var input = document.getElementById("countdownField").value;
            if (input) {
                var target_date = new Date(input).getTime();
                localStorage.setItem("target_date", target_date);
                if (interval) {
                    clearInterval(interval);
                }
                startCountdown(target_date);
            }
        }

        // Function to start the countdown
        function startCountdown(target_date) {
            interval = setInterval(function () {
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;

                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;

                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;

                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                countdown.innerHTML = days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ";
            }, 1000);
        }

        // Check localStorage for saved target date
        window.onload = function() {
            updateVideoURL();
            inputField.value = localStorage.getItem('videolink');
            var saved_target_date = localStorage.getItem("target_date");
            if (saved_target_date) {
              countdownField.value = new Date(parseInt(saved_target_date)).toISOString().substring(0, 16);
                startCountdown(parseInt(saved_target_date));
            } else {
                // Optional: set a default initial countdown date
            }

            // countdown name

            var saved_countdown_name = localStorage.getItem("countdown_name");
            if (saved_countdown_name) {
                countdownname.innerHTML = saved_countdown_name;
                countdownName.value = saved_countdown_name;
            }
        };

        // Function set countdown name
        function setCountdownName() {
            var input = document.getElementById("countdownName").value;
            localStorage.setItem("countdown_name", input);
            countdownname.innerHTML = input;
        }

        function clearCountdown() {
          localStorage.removeItem("target_date");
          localStorage.removeItem("countdown_name");
          countdownname.innerHTML = null;
          countdownName.value = null;
          countdownField.value = null;
          countdown.innerHTML = null;
          clearInterval(interval);
        }