import { Provider } from 'react-redux';
import CountryList from './components/CountryList';
import { store } from './store';
import { GlobalStyle } from './styles';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <CountryList />
    </Provider>
  );
}

export default App;
