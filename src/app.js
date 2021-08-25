function Home(data) {
  const items = data.map((item) => {
    const url = '/' + item.title.toLowerCase().replace(' ', '-');

    return `
      <li>
        <a href="${url}" data-title="${url}">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </a>
      </li>
    `;
  }).join('');
  
  return `
    <div>
      <h1>Clubbeans</h1>
      
      <ul>
        ${items}
      </ul>
    </div>
  `;
}

function Item(data) {
  const item = data.ingredients.map((item) => {
    return `<li>${item}</li>`;
  }).join('');
  
  return `
    <div>
      <h6>${data.title}</h6>
      
      <ul>
        ${item}
      </ul>
    </div>
  `;
}

async function App() {
  const url = location.pathname;
  const result = await fetch('https://api.sampleapis.com/coffee/hot/?_limit=5');
  const data = await result.json();
  
  const routes = {
    '/': Home(data),
  };
  
  data.forEach((item) => {
    const url = '/' + item.title.toLowerCase().replace(' ', '-');
    
    routes[url] = Item(item)
  });
  
  const appWrapper = document.querySelector('[data-js="app"]');
  appWrapper.innerHTML = routes[url] || '<div><h4>Error 404</h4></div>'
  const anchorElem = document.querySelectorAll('[data-title]');
  anchorElem.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, location.origin + url);
    App();
  }))
  
  return appWrapper;
}

export default App;
