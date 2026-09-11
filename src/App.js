import { Navbar } from './components/Navbar.js';
import { Home } from './pages/Home.js';
import { Footer } from './components/Footer.js';

export function App() {
  return `
    <div class="app-container">
      ${Navbar()}
      <main id="main-content">
        ${Home()}
      </main>
      ${Footer()}
    </div>
  `;
}
