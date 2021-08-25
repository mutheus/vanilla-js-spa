import App from './app';

import './global.css';

window.onpopstate = () => App();
document.addEventListener('DOMContentLoaded', App);
