//    ____  _   ________            ____  ___   ____________   ________  ___   ________   
//   / __ \/ | / / ____/           / __ \/   | / ____/ ____/  / ____/ / / / | / / ____/   
//  / / / /  |/ / __/    ______   / /_/ / /| |/ / __/ __/    / /_  / / / /  |/ / /        
// / /_/ / /|  / /___   /_____/  / ____/ ___ / /_/ / /___   / __/ / /_/ / /|  / /___   _  
// \____/_/ |_/_____/           /_/   /_/  |_\____/_____/  /_/    \____/_/ |_/\____/  (_) 

const homePage = document.getElementById("home");
const aboutPage = document.getElementById("about");
const projectPage = document.getElementById("project");
const contactPage = document.getElementById("contacts");

function home() {
    if (homePage.style.display = "none") {
        homePage.style.display = "block";
        aboutPage.style.display = "none";
        projectPage.style.display = "none";
        contactPage.style.display = "none";
    }
}

function about() {
  if (aboutPage.style.display = "none") {
      homePage.style.display = "none";
      aboutPage.style.display = "block";
      projectPage.style.display = "none";
      contactPage.style.display = "none";
  }
}

function preloadProjectContent() {
    // Array of image URLs to preload
    var projectContent = [
      "/photos/projects.webp",
      "/photos/project-2.webp"
    ];
  
    var imagesLoaded = 0;
    var totalProjectContent = projectContent.length;
  
    function imageLoaded() {
      imagesLoaded++;
  
      if (imagesLoaded === totalProjectContent) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("project").style.display = "block";
        document.getElementById("home").style.display = "none";
        document.getElementById("about").style.display = "none";
        document.getElementById("contacts").style.display = "none";
      }
    }
  
    for (var i = 0; i < totalProjectContent; i++) {
      var img = new Image();
      img.onload = imageLoaded;
      img.src = projectContent[i];
    }
  }
  
  document.getElementById("preloadProject").addEventListener("click", function() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("home").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("project").style.display = "none";
    document.getElementById("contacts").style.display = "none";
    preloadProjectContent();
  });
  



  function preloadContactContent() {
    // Array of image URLs to preload
    var contactContent = [
      "/photos/map.webp"
    ];
  
    var imagesLoaded = 0;
    var totalContactContent = contactContent.length;
  
    function imageLoaded() {
      imagesLoaded++;
  
      if (imagesLoaded === totalContactContent) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("project").style.display = "none";
        document.getElementById("home").style.display = "none";
        document.getElementById("about").style.display = "none";
        document.getElementById("contacts").style.display = "block";
      }
    }
  
    for (var i = 0; i < totalContactContent; i++) {
      var img = new Image();
      img.onload = imageLoaded;
      img.src = contactContent[i];
    }
  }
  
  document.getElementById("preloadContact").addEventListener("click", function() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("home").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("project").style.display = "none";
    document.getElementById("contacts").style.display = "none";
    preloadContactContent();
  });

  //     ____  ____  ______            __    ____  ___    ____     ________  ___   ________   
//    / __ \/ __ \/ ____/           / /   / __ \/   |  / __ \   / ____/ / / / | / / ____/   
//   / /_/ / /_/ / __/    ______   / /   / / / / /| | / / / /  / /_  / / / /  |/ / /        
//  / ____/ _, _/ /___   /_____/  / /___/ /_/ / ___ |/ /_/ /  / __/ / /_/ / /|  / /___   _  
// /_/   /_/ |_/_____/           /_____/\____/_/  |_/_____/  /_/    \____/_/ |_/\____/  (_) 

window.addEventListener('load', function() {
  var logs = document.getElementById('logs');
  var content = document.getElementById('content');
  var tryAgainButton = document.getElementById('try-again-button');
  var loadHeader = document.getElementById("loadHeader");

  // Array of files to load
  var files = [
    { url: '/video/bgv.mp4', type: 'video' },
    { url: '/audio/bgm.mp3', type: 'audio' },
    { url: '/photos/profile.webp', type: 'image' },
    { url: '/photos/facebook.webp', type: 'image' },
    { url: '/photos/github.webp', type: 'image' },
    { url: '/photos/linkedin.webp', type: 'image' },
    '/styles.css',
    '/icon.css',
    // Add more files here
  ];

  function loadFile(file) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', file.url || file, true);
      xhr.responseType = file.type === 'video' ? 'blob' : '';
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (file.type === 'video') {
              resolve(window.URL.createObjectURL(xhr.response));
            } else {
              resolve(xhr.responseText);
            }
          } else {
            reject('Error loading file: ' + (file.url || file));
          }
        }
      };
      xhr.send();
    });
  }

  function displayLog(log, file) {
    var logElement = document.createElement('p');
    logElement.textContent = log;
    if (file) {
      var fileElement = document.createElement('span');
      fileElement.textContent = ': ' + file;
      logElement.appendChild(fileElement);
    }
    logs.appendChild(logElement);
    logs.scrollTop = logs.scrollHeight; // Scroll to the bottom
  }

  function loadFiles() {
    displayLog('Loading files...');
    var filePromises = files.map(function(file) {
      if (file.type === 'video') {
        return loadVideo(file).then(function(response) {
          displayLog('Loaded', file.url);
          return response;
        }).catch(function(error) {
          displayLog('Error loading', file.url);
          throw error;
        });
      } else if (file.type === 'audio') {
        return loadAudio(file).then(function(response) {
          displayLog('Loaded', file.url);
          return response;
        }).catch(function(error) {
          displayLog('Error loading', file.url);
          throw error;
        });
      } else if (file.type === 'image') {
        return loadImage(file).then(function(response) {
          displayLog('Loaded', file.url);
          return response;
        }).catch(function(error) {
          displayLog('Error loading', file.url);
          throw error;
        });
      } else {
        return loadFile(file).then(function(response) {
          displayLog('Loaded', file);
          return response;
        }).catch(function(error) {
          displayLog('Error loading', file);
          throw error;
        });
      }
    });

    Promise.allSettled(filePromises).then(function(results) {
      var hasError = results.some(function(result) {
        return result.status === 'rejected';
      });

      if (hasError) {
        displayLog('Some files failed to load.');
        loadHeader.innerHTML = "Loading Failed";
        tryAgainButton.style.display = 'block'; // Show the "Try Again" button
      } else {
        displayLog('All files loaded successfully.');
        content.style.display = 'block'; // Show the main content
        document.getElementById('loading-phase').style.display = 'none'; // Hide the loading phase
        // You can access the loaded file contents here
      }
    });
  }

  function loadVideo(file) {
    return new Promise(function(resolve, reject) {
      var video = document.createElement('video');
      video.preload = 'auto';
      video.onloadeddata = function() {
        resolve(video);
      };
      video.onerror = function() {
        reject('Error loading video: ' + (file.url || file));
      };
      video.src = file.url || file;
      video.load();
    });
  }

  function loadAudio(file) {
    return new Promise(function(resolve, reject) {
      var audio = new Audio();
      audio.preload = 'auto';
      audio.onloadeddata = function() {
        resolve(audio);
      };
      audio.onerror = function() {
        reject('Error loading audio: ' + (file.url || file));
      };
      audio.src = file.url || file;
      audio.load();
    });
  }

  function loadImage(file) {
    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function() {
        reject('Error loading image: ' + (file.url || file));
      };
      image.src = file.url || file;
    });
  }

  function resetLogs() {
    logs.innerHTML = '';
  }

  function resetTryAgainButton() {
    tryAgainButton.style.display = 'none';
  }

  function retryLoading() {
    resetLogs();
    resetTryAgainButton();
    loadFiles();
  }

  loadFiles();

  tryAgainButton.addEventListener('click', retryLoading);
});









// The Alert Function
// Select the target element
var targetElement = document.getElementById("content");

// Create a new MutationObserver instance
var observer = new MutationObserver(function (mutationsList) {
  // Check if the "display" property has changed to "block"
  if (targetElement.style.display === "block") {
    setTimeout(showAlert, 2000); // Delay of 2 seconds (2000 milliseconds)
    observer.disconnect(); // Stop observing once the condition is met
  }
});

// Start observing changes to the target element's attributes
observer.observe(targetElement, { attributes: true });

function showAlert() {
  var alertBox = document.getElementById("alertBox");
  alertBox.classList.add("show");
}






// The Music Function
var spamButton = document.getElementById("spamButton");
var spamContent = document.getElementById("spamContent");
var audio = document.getElementById("myAudio");
var originalContent = spamContent.innerHTML;

spamButton.addEventListener("click", function() {
  if (spamContent.innerHTML === originalContent) {
    spamContent.innerHTML = "Music: Vamp, By fwsatoru";
  } else {
    spamContent.innerHTML = originalContent;
  }

  if (audio.paused) {
    audio.play();
    playButton.innerHTML = "Pause Music";
  } else {
    audio.pause();
    playButton.innerHTML = "Play Music";
  }
});

