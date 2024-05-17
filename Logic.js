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

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock').innerHTML = timeString;
  }
  setInterval(updateClock, 1000); 
  updateClock(); 

