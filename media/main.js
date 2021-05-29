const vscode = acquireVsCodeApi();

const toggelTheme = () => {
  rawSetTheme(document.querySelector('#toggleB').checked ? "light" : "dark")
};

const openCode = (codePath,line) => {
  vscode.postMessage({
    command: 'code',
    code : {
      codePath,line
    }
  })
};

const rawSetTheme = (rawTheme) => {
  const root = window.document.documentElement;
  const isDark = rawTheme === "dark";
  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(rawTheme);
  vscode.postMessage({
    command: 'theme',
    text: rawTheme
  })
  document.querySelector('#toggleB').checked = !isDark
};

const clearAll = () => {
  document.getElementById('log_area').innerHTML = '';
}

(function () {
  rawSetTheme(window.themeName);

  var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  window.socket.on('log', (msg) => {
      const span = document.createElement('span');
      setInnerHTML(span,msg.view)
      document.getElementById('log_area').appendChild(span);
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  });
}());