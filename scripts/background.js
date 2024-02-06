const tabsWithContentScript = new Set();

chrome.runtime.onMessage.addListener(function (message, sender) {
  // recieve tabID of contentScript loaded page
  if (message.message === "contentScriptLoaded") {
    tabsWithContentScript.add(sender.tab.id);
  }

  // forward popup's message to content scripted page
  if (message.action === "timeToggle") {
    for (tabID of tabsWithContentScript) {
      chrome.tabs.sendMessage(tabId, message);
    }
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tabsWithContentScript.has(tabId)) {
    chrome.tabs.sendMessage(tabId, {
      message: "urlchange",
    });
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.local.set({ militaryTime: false });
  }
});
