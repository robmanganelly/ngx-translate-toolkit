function copyToClipboard(elementId) {
  const codeElement = document.getElementById(elementId).querySelector('pre code');
  const text = codeElement ? codeElement.innerText : document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const message = document.createElement('div');
    message.innerText = 'Code copied to clipboard!';
    message.style.position = 'fixed';
    message.style.bottom = '10px';
    message.style.right = '10px';
    message.style.backgroundColor = '#333';
    message.style.color = '#fff';
    message.style.padding = '10px';
    message.style.borderRadius = '5px';
    message.style.zIndex = '1000';
    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
