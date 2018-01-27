const actions = {
  ADD_STAR: 1,
  REMOVE_STAR: 2,
  START_MINING: 3,
  STOP_MINING: 4
}

var storage = chrome.storage.local;
var miningIcon = document.getElementById("miningIcon");
var miningButton = document.getElementById("miningButton");

storage.get('mining', function(data) {
  if (typeof data.mining === 'undefined') {
    storage.set({'mining': false}, function() {});
  }
});

storage.get('mining', function(data) {
  if(data.mining === true) {
    startMining();
  } else {
    stopMining();
  }
});

document.getElementById("miningButton").onclick = startStopMining;

function startStopMining(){
  storage.get('mining', function(data) {
    if(data.mining === true) {
      storage.set({'mining': false}, function() {});
      stopMining();
    } else {
      storage.set({'mining': true}, function() {});
      startMining();
    }
  });
}

function startMining() {
  miningIcon.src="icon-new.gif";
  chrome.runtime.sendMessage({ action: actions.START_MINING });
  miningButton.innerHTML="CONNECTING...";

  setTimeout(function(){
    chrome.browserAction.setIcon({path:"images/icon-activated.png"});
    miningIcon.src="images/icon-new-white.png";
    miningButton.innerHTML="STOP";

    body.style.backgroundColor = "#1b9ce2";
    body.style.color = "white";
  }, 2000);


}

function stopMining() {
  body.style.backgroundColor = "#F5F5F5";
  body.style.color = "#AAAAAA";

  chrome.browserAction.setIcon({path:"images/icon.png"});
  miningIcon.src="images/icon-new-op.png";
  miningButton.innerHTML="START";
  chrome.runtime.sendMessage({ action: actions.STOP_MINING });
  chrome.browserAction.setIcon({path:"images/icon.png"});
}
