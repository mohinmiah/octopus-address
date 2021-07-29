import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import SiteHeader from './components/SiteHeader/SiteHeader';
import { UserAddressPage } from './pages/UserAddressPage/UserAddressPage';
import { appStore } from './store/Store';

function App() {
  return (
    <div className="App">
      <SiteHeader subtitle="investments" />
      <Provider store={appStore}>
        <UserAddressPage />
      </Provider>
    </div>
  );
}

export default App;
