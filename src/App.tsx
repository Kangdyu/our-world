import { Provider } from 'react-redux';
import Home from './components/Home';
import { store } from './store';
import { GlobalStyle } from './styles';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Home />
    </Provider>
  );
}

export default App;
