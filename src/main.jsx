import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './utils/redux/store';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// setting the baseUrl for axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
      <App />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
)