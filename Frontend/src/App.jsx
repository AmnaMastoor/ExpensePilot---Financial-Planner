import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./Context/ThemeContext.js";

function App() {

  return (

    <ThemeProvider>

      <AppRoutes />

    </ThemeProvider>

  );

}

export default App;