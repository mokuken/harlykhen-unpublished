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
  const logs = document.getElementById('logs');
  const content = document.getElementById('content');
  const tryAgainButton = document.getElementById('try-again-button');
  const loadHeader = document.getElementById("loadHeader");

  const files = [
    { url: '/video/bgv.mp4', type: 'video' },
    { url: '/audio/bgm.mp3', type: 'audio' },
    { url: '/photos/profile.webp', type: 'image' },
    { url: 'photos/facebook.webp', type: 'image' },
    { url: '/photos/github.webp', type: 'image' },
    { url: '/photos/linkedin.webp', type: 'image' },
    '/styles.css',
    // Add more files here
  ];

  const links = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
    // Add more links here
  ];

  function displayLog(log) {
    const logElement = document.createElement('p');
    logElement.textContent = log;
    logs.appendChild(logElement);
    logs.scrollTop = logs.scrollHeight; // Scroll to the bottom
  }

  async function loadFile(file) {
    const url = file.url || file;
    try {
      const response = await fetch(url);
      if (file.type === 'video') {
        return window.URL.createObjectURL(await response.blob());
      } else {
        return await response.text();
      }
    } catch (error) {
      throw new Error(`Error loading file: ${url}`);
    }
  }

  async function loadLink(link) {
    try {
      await fetch(link, { method: 'HEAD' });
    } catch (error) {
      throw new Error(`Error accessing link: ${link}`);
    }
  }

  async function loadFiles() {
    displayLog('Loading files and links...');
    const filePromises = files.map(async function(file) {
      try {
        let response;
        if (file.type === 'video') {
          response = await loadVideo(file);
        } else if (file.type === 'audio') {
          response = await loadAudio(file);
        } else if (file.type === 'image') {
          response = await loadImage(file);
        } else {
          response = await loadFile(file);
        }
        displayLog(`Loaded: ${file.url || file}`);
        return response;
      } catch (error) {
        displayLog(`Error loading: ${file.url || file}`);
        throw error;
      }
    });

    const linkPromises = links.map(async function(link) {
      try {
        await loadLink(link);
        displayLog(`Source Link Loaded: ${link}`);
      } catch (error) {
        displayLog(error);
        throw error;
      }
    });

    try {
      await Promise.allSettled([...filePromises, ...linkPromises]);
      displayLog('All files and links loaded successfully.');
      content.style.display = 'block'; // Show the main content
      document.getElementById('loading-phase').style.display = 'none'; // Hide the loading phase
      // You can access the loaded file contents or accessible links here
    } catch (error) {
      displayLog('Some files or links failed to load.');
      loadHeader.textContent = 'Loading Failed';
      tryAgainButton.style.display = 'block'; // Show the "Try Again" button
    }
  }

  async function loadVideo(file) {
    const url = file.url || file;
    return new Promise(function(resolve, reject) {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.onloadeddata = function() {
        resolve(video);
      };
      video.onerror = function() {
        reject(new Error(`Error loading video: ${url}`));
      };
      video.src = url;
      video.load();
    });
  }

  async function loadAudio(file) {
    const url = file.url || file;
    return new Promise(function(resolve, reject) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.onloadeddata = function() {
        resolve(audio);
      };
      audio.onerror = function() {
        reject(new Error(`Error loading audio: ${url}`));
      };
      audio.src = url;
      audio.load();
    });
  }

  async function loadImage(file) {
    const url = file.url || file;
    return new Promise(function(resolve, reject) {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function() {
        reject(new Error(`Error loading image: ${url}`));
      };
      image.src = url;
    });
  }

  function resetLogs() {
    logs.textContent = '';
  }

  function resetTryAgainButton() {
    tryAgainButton.style.display = 'none';
  }

  function retryLoading() {
    resetLogs();
    resetTryAgainButton();
    loadFiles();
  }

  function initialize() {
    loadFiles();
    tryAgainButton.addEventListener('click', retryLoading);
  }

  initialize();
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

