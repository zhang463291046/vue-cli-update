const downloadFile = function(fileName, content) {
  const aLink = document.createElement('a');

  aLink.target = '_blank';
  aLink.download = fileName;
  aLink.href = content;
  if (typeof MouseEvent === 'function') {
    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    aLink.dispatchEvent(evt);
  } else {
    const html = '' +
      '<body style="margin:0;">' +
      '<img src="' + content + '" style="max-width:100%;" title="" />' +
      '</body>';
    const tab = window.open();
    tab.document.write(html);
  }
};

export default downloadFile;
