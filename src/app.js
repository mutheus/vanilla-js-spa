import latinize from 'latinize';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function Home(data) {
  const items = data.map((item) => {
    const url = latinize('/' + item.title.toLowerCase().replace(' ', '-'));

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
      <a href="/" data-js="back-btn">< Back</a>
      <h1>${data.title}</h1>
      
      <h4>ingredients:</h4>
      
      <ul>
        ${item}
      </ul>
    </div>
  `;
}

async function App() {
  const url = location.pathname;
  const result = await fetch('https://api.sampleapis.com/coffee/hot/?_limit=10');
  const data = await result.json();
  
  const routes = {
    '/': Home(data),
  };
  
  data.forEach((item) => {
    const url = latinize('/' + item.title.toLowerCase().replace(' ', '-'));
    
    routes[url] = Item(item)
  });
  
  const appWrapper = document.querySelector('[data-js="app"]');
  appWrapper.innerHTML = routes[url] || '<div><h3>Error 404</h3></div>'
  const anchorElem = document.querySelectorAll('[data-title]');
  const backBtn = document.querySelectorAll('[data-js="back-btn"]');
  anchorElem.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, location.origin + a.dataset.title);
    App();
  }))
  backBtn.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, location.origin + '/');
    App();
  }))
  
  return appWrapper;
}

export default App;
