var urls = {};

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (!urls.hasOwnProperty(info.menuItemId)) return;
  var url = urls[info.menuItemId].replace(/\${url}/g, tab.url).replace(/\${escaped_url}/g, encodeURIComponent(tab.url));
  chrome.tabs.create({ url: url });
});

chrome.contextMenus.create({
  id: 'cache-link',
  title: 'キャッシュを表示する',
  contexts: ['all']
});

[
  {
    title: 'Internet Archive',
    url: 'http://wayback.archive.org/web/*/${url}'
  },
  {
    title: 'Google Cache',
    url: 'http://webcache.googleusercontent.com/search?q=cache:${escaped_url}'
  },
  {
    title: 'ウェブ魚拓',
    url: 'http://megalodon.jp/?url=${escaped_url}'
  }
].forEach(function (prop, i) {
  var id = 'cache-link-' + i;
  urls[id] = prop.url;
  chrome.contextMenus.create({
    id: id,
    parentId: 'cache-link',
    title: prop.title
  });
});
