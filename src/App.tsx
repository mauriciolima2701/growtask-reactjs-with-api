import { Provider } from 'react-redux';
import GlobalStyle from './config/GlobalStyle';
import AppRoutes from './routes/AppRoutes';
import { myStore } from './store';



const App: React.FC = () => {
  return (
    <>
      <Provider store={myStore}>
        <GlobalStyle />
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
