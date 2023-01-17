import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './routes';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <RouterProvider router={routes} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
