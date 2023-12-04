import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import appStore from './utils/store/appStore';

import Authentication from './components/Authentication';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Provider store={appStore}>
      <Authentication />
      <NavBar />
      <Outlet />
      <Footer />
    </Provider>
  );
};

export default App;
