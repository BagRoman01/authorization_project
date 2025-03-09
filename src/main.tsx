import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

const store = new Store();
export const Context = createContext({
  store,
});

// Проверка, что элемент с id 'root' существует
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  );
} else {
  console.error('Element with id "root" not found');
}
