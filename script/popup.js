document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('btnActivate').addEventListener('click', async function() {
      const queryOptions = { active: true, currentWindow: true };
      const [tab] = await chrome.tabs.query(queryOptions);
  
      chrome.runtime.sendMessage({ message: 'toggle', tab: tab });
    });
  });