//  _______  ______    _______         ___      _______  _______  ______
//  |       ||    _ |  |       |       |   |    |       ||   _   ||      |
//  |    _  ||   | ||  |    ___| ____  |   |    |   _   ||  |_|  ||  _    |
//  |   |_| ||   |_||_ |   |___ |____| |   |    |  | |  ||       || | |   |
//  |    ___||    __  ||    ___|       |   |___ |  |_|  ||       || |_|   |
//  |   |    |   |  | ||   |___        |       ||       ||   _   ||       |
//  |___|    |___|  |_||_______|       |_______||_______||__| |__||______|

window.addEventListener("load", function () {
  var logs = document.getElementById("logs");
  var content = document.getElementById("main-content");
  var tryAgainButton = document.getElementById("try-again-button");
  var loadHeader = document.getElementById("loadHeader");

  // Array of files to load
  var files = [
    { url: "/harlykhen/video/bgv.mp4", type: "video" },
    { url: "/harlykhen/audio/bgm.mp3", type: "audio" },
    { url: "/harlykhen/photos/profile.webp", type: "image" },
    { url: "/harlykhen/photos/project-2.webp", type: "image" },
    { url: "/harlykhen/photos/projects.webp", type: "image" },
    { url: "/harlykhen/audio/bgm-thumbnail.png", type: "image" },
    "/harlykhen/style.css",
    "/harlykhen/icon.css",
    // Add more files here
  ];

  function loadFile(file) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", file.url || file, true);
      xhr.responseType = file.type === "video" ? "blob" : "";
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (file.type === "video") {
              resolve(window.URL.createObjectURL(xhr.response));
            } else {
              resolve(xhr.responseText);
            }
          } else {
            reject("Error loading file: " + (file.url || file));
          }
        }
      };
      xhr.send();
    });
  }

  function displayLog(log, file) {
    var logElement = document.createElement("p");
    logElement.textContent = log;
    if (file) {
      var fileElement = document.createElement("span");
      fileElement.textContent = ": " + file;
      logElement.appendChild(fileElement);
    }
    logs.appendChild(logElement);
    logs.scrollTop = logs.scrollHeight; // Scroll to the bottom
  }

  function loadFiles() {
    displayLog("Loading files...");
    var filePromises = files.map(function (file) {
      if (file.type === "video") {
        return loadVideo(file)
          .then(function (response) {
            displayLog("Loaded", file.url);
            return response;
          })
          .catch(function (error) {
            displayLog("Error loading", file.url);
            throw error;
          });
      } else if (file.type === "audio") {
        return loadAudio(file)
          .then(function (response) {
            displayLog("Loaded", file.url);
            return response;
          })
          .catch(function (error) {
            displayLog("Error loading", file.url);
            throw error;
          });
      } else if (file.type === "image") {
        return loadImage(file)
          .then(function (response) {
            displayLog("Loaded", file.url);
            return response;
          })
          .catch(function (error) {
            displayLog("Error loading", file.url);
            throw error;
          });
      } else {
        return loadFile(file)
          .then(function (response) {
            displayLog("Loaded", file);
            return response;
          })
          .catch(function (error) {
            displayLog("Error loading", file);
            throw error;
          });
      }
    });

    Promise.allSettled(filePromises).then(function (results) {
      var hasError = results.some(function (result) {
        return result.status === "rejected";
      });

      if (hasError) {
        displayLog("Some files failed to load.");
        loadHeader.innerHTML = "Loading Failed";
        tryAgainButton.style.display = "block"; // Show the "Try Again" button
      } else {
        displayLog("All files loaded successfully.");
        content.style.display = "flex"; // Show the main content
        document.getElementById("loading-phase").style.display = "none"; // Hide the loading phase
        // You can access the loaded file contents here
      }
    });
  }

  function loadVideo(file) {
    return new Promise(function (resolve, reject) {
      var video = document.createElement("video");
      video.preload = "auto";
      video.onloadeddata = function () {
        resolve(video);
      };
      video.onerror = function () {
        reject("Error loading video: " + (file.url || file));
      };
      video.src = file.url || file;
      video.load();
    });
  }

  function loadAudio(file) {
    return new Promise(function (resolve, reject) {
      var audio = new Audio();
      audio.preload = "auto";
      audio.onloadeddata = function () {
        resolve(audio);
      };
      audio.onerror = function () {
        reject("Error loading audio: " + (file.url || file));
      };
      audio.src = file.url || file;
      audio.load();
    });
  }

  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () {
        resolve(image);
      };
      image.onerror = function () {
        reject("Error loading image: " + (file.url || file));
      };
      image.src = file.url || file;
    });
  }

  function resetLogs() {
    logs.innerHTML = "";
  }

  function resetTryAgainButton() {
    tryAgainButton.style.display = "none";
  }

  function retryLoading() {
    resetLogs();
    resetTryAgainButton();
    loadFiles();
  }

  loadFiles();

  tryAgainButton.addEventListener("click", retryLoading);
});

//  _______  __    _  _______         _______  _______  _______  _______
//  |       ||  |  | ||       |       |       ||   _   ||       ||       |
//  |   _   ||   |_| ||    ___| ____  |    _  ||  |_|  ||    ___||    ___|
//  |  | |  ||       ||   |___ |____| |   |_| ||       ||   | __ |   |___
//  |  |_|  ||  _    ||    ___|       |    ___||       ||   ||  ||    ___|
//  |       || | |   ||   |___        |   |    |   _   ||   |_| ||   |___
//  |_______||_|  |__||_______|       |___|    |__| |__||_______||_______|

const homePage = document.getElementById("home");
const aboutPage = document.getElementById("about");
const projectPage = document.getElementById("project");
const contactPage = document.getElementById("contact");

function home() {
  if ((homePage.style.display = "none")) {
    homePage.style.display = "flex";
    aboutPage.style.display = "none";
    projectPage.style.display = "none";
    contactPage.style.display = "none";
  }
}

function about() {
  if ((aboutPage.style.display = "none")) {
    homePage.style.display = "none";
    aboutPage.style.display = "block";
    projectPage.style.display = "none";
    contactPage.style.display = "none";
  }
}

function project() {
  if ((projectPage.style.display = "none")) {
    homePage.style.display = "none";
    aboutPage.style.display = "none";
    projectPage.style.display = "block";
    contactPage.style.display = "none";
  }
}

function contact() {
  if ((projectPage.style.display = "none")) {
    homePage.style.display = "none";
    aboutPage.style.display = "none";
    projectPage.style.display = "none";
    contactPage.style.display = "block";
  }
}

const elements = document.getElementsByClassName("nav");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function () {
    for (let j = 0; j < elements.length; j++) {
      elements[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}

//  _______  ___      _______  ______    _______         __    _  _______  _______  ___   _______
//  |   _   ||   |    |       ||    _ |  |       |       |  |  | ||       ||       ||   | |       |
//  |  |_|  ||   |    |    ___||   | ||  |_     _| ____  |   |_| ||   _   ||_     _||   | |    ___|
//  |       ||   |    |   |___ |   |_||_   |   |  |____| |       ||  | |  |  |   |  |   | |   |___
//  |       ||   |___ |    ___||    __  |  |   |         |  _    ||  |_|  |  |   |  |   | |    ___|
//  |   _   ||       ||   |___ |   |  | |  |   |         | | |   ||       |  |   |  |   | |   |
//  |__| |__||_______||_______||___|  |_|  |___|         |_|  |__||_______|  |___|  |___| |___|

// The Alert Function
// Select the target element
var targetElement = document.getElementById("main-content");

// Create a new MutationObserver instance
var observer = new MutationObserver(function (mutationsList) {
  // Check if the "display" property has changed to "block"
  if (targetElement.style.display === "flex") {
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

var playerButton = document.getElementById("player");
var playIndicator = document.getElementById("play");
var music = document.getElementById("music-name");
var barAnim1 = document.getElementById("bar1");
var barAnim2 = document.getElementById("bar2");
var barAnim3 = document.getElementById("bar3");
var audio = document.getElementById("myAudio");

playerButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    barAnim1.classList.add("active");
    barAnim2.classList.add("active");
    barAnim3.classList.add("active");
    playerButton.classList.add("active");
    playIndicator.style.display = "none";
    music.style.display = "block";
  } else {
    audio.pause();
    barAnim1.classList.remove("active");
    barAnim2.classList.remove("active");
    barAnim3.classList.remove("active");
    playerButton.classList.remove("active");
    playIndicator.style.display = "block";
    music.style.display = "none";
  }
});
