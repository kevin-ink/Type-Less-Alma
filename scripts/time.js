// candidate parent elems
// to start search from
const elemIDS = ["loanList", "returnList"];

// setup
let militaryTime = false;
chrome.storage.local.get(["key"]).then((result) => {
  if (result.key) {
    militaryTime = result.key;
    searchAndConvert();
  }
});

// listens for urlchange message from background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "urlchange") {
    if (militaryTime) {
      return;
    }
    searchAndConvert();
  }
  if (request.message === "timeToggle") {
    militaryTime = request.value;
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
        node.nodeValue = convertMilitaryTime(node.nodeValue);
      }
      searchAndConvert(node);
    }
  }
}
