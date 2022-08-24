import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { useStateContext } from './contexts/ContextProvider';
import { DispositivosPage } from "./pages/DispositivosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { ReportesPage } from "./pages/ReportesPage";
import './App.css';
import './styles/Sidebar.css';
import { Error404Page } from "./pages/Error404Page";

function App() {
  const { currentMode } = useStateContext();
  return (
    <div className={currentMode}>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/dispositivos' element={<DispositivosPage />} />
          <Route exact path='/usuarios' element={<UsuariosPage />} />
          <Route exact path='/reportes' element={<ReportesPage />} />
          <Route exact path='*' element={<Error404Page />} />
        </Routes>
      </HashRouter>
    </div>

  );
}

export default App;
