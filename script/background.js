// background.js
const instagram = 'https://www.instagram.com';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.message === 'toggle') {
    const tab = request.tab;

    if (tab.url.startsWith(instagram)) {
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      const nextState = prevState === 'ON' ? 'OFF' : 'ON';

      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });

      if (nextState === 'ON') {
        await chrome.scripting.insertCSS({
          files: ['styles/focus-mode.css'],
          target: { tabId: tab.id },
        });
      } else if (nextState === 'OFF') {
        await chrome.scripting.removeCSS({
          files: ['styles/focus-mode.css'],
          target: { tabId: tab.id },
        });
      }
    }
  }
});
