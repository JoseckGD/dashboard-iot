import { useStateContext } from "../contexts/ContextProvider";
import '../styles/ToggleLightDark.css';

export const ToggleLightDark = () => {

  const {
    setMode,
    currentMode } = useStateContext();

  return (
    <div className="t">
      <p>
        Tema {currentMode}
      </p>
      <div className="toggle" >
        <div className="circulo" onClick={setMode}></div>
      </div >
    </div >
  )
}
