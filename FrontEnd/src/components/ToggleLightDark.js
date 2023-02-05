import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import '../styles/stylesComponents/ToggleLightDark.css';
import { User } from "./User";

export const ToggleLightDark = ({ botones }) => {

  const {
    setMode,
    currentMode } = useStateContext();

  return (
    <div className="t">
      <div className="a">
        <p>
          Tema {currentMode}
        </p>
        <div className="toggle" onClick={setMode}>
          <div className="circulo" ></div>
        </div >
      </div>
      {/* <NavLink
        to={'/logout'}
        className='Close'
        onClick={() => closeSesion()}
      >
        {'Cerrar Sesion'}
      </NavLink> */}
      {botones !== false &&
        <User />
      }
    </div >
  )
}
