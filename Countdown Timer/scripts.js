// JavaScript 30

//declare countdown timer, dom display end-time and data-time classes
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds){
 //clear timer
 clearInterval(countdown);

 //get the current time(now),and what time it will be after the seconds have passed(then)
 const now = Date.now();
 const then = now + seconds * 1000;

 //call fn
 displayTimeLeft(seconds);
 displayEndTime(then);

 // set the coutdown to be call every second(setInterval()) to calucalte how many seconds are left
 countdown = setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000);

  //stop countdown if no seconds left
  if(secondsLeft < 0 ){
   clearInterval(countdown);
   return;
  }

  //call fn passing how many seconds remain
  displayTimeLeft(secondsLeft);
 }, 1000);
}


function displayTimeLeft(seconds){
 //convert seconds to minutes
 const minutes = Math.floor(seconds / 60);
 //calulate the remaining seconds
 const remainderSeconds = seconds % 60;
 //display the countdown
 const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
 document.title = display;
 timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
 const end = new Date(timestamp);
 //use the getHours() method from the time Object to get the hour
 const hour = end.getHours();
 //display hour
 const adjustedHour = hour > 12 ? hour - 12 : hour;
// use  getMinutes() method
 const minutes = end.getMinutes();
 endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
 //get the time from the event data set time
 const seconds = parseInt(this.dataset.time);
 //call fn passing the seconds
 timer(seconds);
}

//add eventlisteners to the buttons
buttons.forEach(button => button.addEventListener('click', startTimer));
// add event listener to the form when user submit a time
document.customForm.addEventListener('submit', function(e){
 e.preventDefault();
 //assign the user input
 const mins = this.minutes.value;
 //call fn passing seconds(minutes * 60)
 timer(mins * 60);
 //reset form
 this.reset();
})


