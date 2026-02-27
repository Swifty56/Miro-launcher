/* Triggered whenever the user clicks the toolbar-button */
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) return;                 // safety

  try {
    const oldUrl = new URL(tab.url);

    /* Only act on miro.com pages */
    if (!oldUrl.hostname.endsWith('miro.com')) {
      console.debug('Not a miro.com URL → no rewrite');
      return;
    }

    /* Build the new link: keep pathname, search, and hash intact */
    const newUrl = `miroapp://miro.com${oldUrl.pathname}${oldUrl.search}${oldUrl.hash}`;

    /* Launch the custom-protocol URI in a *new* tab.
       (tabs.update also works, but some Chrome versions block
        unknown schemes inside a normal tab.)               */
    await chrome.tabs.create({ url: newUrl });

    /* —optional— close the original https tab */
    // await chrome.tabs.remove(tab.id);
  } catch (err) {
    console.error('Miro-protocol rewrite failed:', err);
  }
});
