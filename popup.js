var storage = chrome.storage.local;
var miningText = document.getElementById("miningText");
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
  miningIcon.src="icon.gif";

  miningText.innerText="CONNECTING";
  miningText.style.color="#969696";

  miningButton.innerHTML="CONNECTING...";

  setTimeout(function(){
    chrome.browserAction.setIcon({path:"images/icon-activated.png"});

    miningIcon.src="images/icon-blue.png";

    miningText.innerText="MINING";
    miningText.style.color="#1B9CE2";

    miningButton.innerHTML="<i class=\"material-icons right\">money_off</i>STOP";
  }, 2000);


}

function stopMining() {
  chrome.browserAction.setIcon({path:"images/icon.png"});

  miningText.innerText="NOT MINING";
  miningText.style.color="#969696";

  miningIcon.src="images/icon-black.png";

  miningButton.innerHTML="<i class=\"material-icons right\">monetization_on</i>START";
}
