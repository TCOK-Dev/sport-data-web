import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import LiveBasketball from './pages/live-basketball/LiveBasketball';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LiveBasketball />
      </Container>
    </ThemeProvider>
  );
}

export default App;
