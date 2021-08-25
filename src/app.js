function Home() {
  return `
    <div>
      <h1>Clubbeans</h1>
      
      <h6><a>go to item</a></h6>
    </div>
  `;
}

function Item() {
  return '<h6>Item</h6>'
}

function App() {
  const url = location.pathname;
  
  const routes = {
    '/': Home(),
    '/item': Item()
  }
  
  const appWrapper = document.querySelector('[data-js="app"]');
  appWrapper.innerHTML = routes[url];
  const anchor = document.querySelector('a');
  anchor.addEventListener('click', () => {
    history.pushState(null, null, location.origin + '/item')
    App();
  });
  
  return appWrapper;
}

export default App;
