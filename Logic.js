window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  const mainContent = document.querySelector('main');
  const logo = document.querySelector('.loader img');

  logo.style.opacity = '1';

  setTimeout(function () {
    preloader.classList.add('fade-out');

    setTimeout(function () {
      preloader.style.display = 'none';
      mainContent.style.display = 'block';
      document.body.style.overflow = 'auto'; 
    }, 1000); 
  }, 2000); 
});

globalPrayerTIme = null;

function updateClock() {
  var now = new Date();
  var hours = now.getHours();      
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  // var currentTime = hours + ':' + minutes + ':' + seconds;
  var currentTime = hours * 60 + minutes;


  if(globalPrayerTIme){
    const [hour, minute] = globalPrayerTIme.split(':').map(Number);
    const counterInMinutes = hour * 60 + minute;    
    const currentTimeInMinutes = currentTime

    const timer = counterInMinutes - currentTimeInMinutes;
  
  document.getElementById('clock').innerHTML = timer;
}
}

function getPrayerTimes() {
  const storedPrayerTimes = localStorage.getItem('prayerTimes');
  if (storedPrayerTimes) {
    return JSON.parse(storedPrayerTimes);
  } else {
    // Default prayer times if none are set
    return {
      fajr: '04:45',
      sunrise: '05:41',
      dhuhr: '13:26',
      asr: '17:37',
      maghrib: '21:12',
      isha: '23:00',
      jumuah: '13:45'
    };
  }
}

function updateNextPrayer() {
  const prayerTimes = getPrayerTimes();
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

  const times = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
    { name: 'Jumuah', time: prayerTimes.jumuah }
  ];

  let nextPrayer = null;
  let nextPrayerTime = null;

  for (let i = 0; i < times.length; i++) {
    const [hours, minutes] = times[i].time.split(':').map(Number);
    const prayerTimeInMinutes = hours * 60 + minutes;

    if (currentTime < prayerTimeInMinutes) {
      nextPrayer = times[i].name;
      nextPrayerTime = times[i].time;
      break;
    }
  }

  if (!nextPrayer) {
    // If no next prayer is found for today, set to the first prayer of the next day
    nextPrayer = times[0].name;
    nextPrayerTime = times[0].time;
  }

  globalPrayerTIme = nextPrayerTime;
  document.getElementById('next-prayer').innerText = nextPrayer;
  document.getElementById('next-prayer-time').innerText = nextPrayerTime;
}



updateClock();
updateNextPrayer();
setInterval(updateClock, 1000); // Update clock every second
setInterval(updateNextPrayer, 60000); // Update next prayer every minute
