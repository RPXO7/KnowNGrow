import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import AppRoutes from './routes';
import Layout from './components/layout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default App;