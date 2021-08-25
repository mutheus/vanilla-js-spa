export function App() {
  const appWrapper = document.querySelector('[data-js="app"]');
  appWrapper.innerHTML = '<h1>Hello, World</h1>';
  return appWrapper;
}