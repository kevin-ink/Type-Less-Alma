// candidate parent elems
// to start search from
const elemIDS = ["loanList", "returnList"];

function getTimePref() {
  chrome.storage.local.get(["militaryTime"]).then((result) => {
    if (result.militaryTime) {
      militaryTime = result.militaryTime;
      searchAndConvert();
    }
  });
}

// setup
let militaryTime = false;
getTimePref();

// listens for urlchange message from background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "urlchange") {
    searchAndConvert();
  }
  if (request.action === "timeToggle") {
    getTimePref();
  }
});

// matches Alma's time format and converts it
function convertMilitaryTime(text) {
  return text.replace(
    /\b([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])\b/g,
    function (match, p1, p2) {
      let hours = parseInt(p1);
      let minutes = p2;
      let suffix = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return hours + ":" + minutes + " " + suffix;
    }
  );
}

function convertToMilitaryTime(text) {
  return text.replace(
    /\b(\d{1,2}):(\d{2})\s?(AM|PM)\b/gi,
    function (match, hours, minutes, suffix) {
      hours = parseInt(hours);
      minutes = parseInt(minutes);

      if (suffix.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      } else if (suffix.toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }

      const formattedHours = (hours < 10 ? "0" : "") + hours;
      const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

      return formattedHours + ":" + formattedMinutes;
    }
  );
}

function searchAndConvert() {
  elemIDS.forEach((id) => {
    let element = document.getElementById(id);
    if (element) {
      searchAndConvert_helper(element);
    }
  });
}

// recursive approach to converting all descendant nodes
function searchAndConvert_helper(e) {
  if (e.hasChildNodes()) {
    let children = e.childNodes;
    for (const node of children) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (militaryTime) {
          node.nodeValue = convertMilitaryTime(node.nodeValue);
        } else {
          node.nodeValue = convertToMilitaryTime(node.nodeValue);
        }
      }
      searchAndConvert_helper(node);
    }
  }
}
