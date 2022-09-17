import '../styles/LoginPage.css';
import logoUser from '../img/user.png';
import { useStateContext } from '../contexts/ContextProvider';
import { useTitle } from '../hooks/useTitle';
import { Ajax } from '../hooks/ajax';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const LoginPage = ({ rol }) => {

  const { currentMode } = useStateContext();
  useTitle('Dashboard IoT | Login ' + rol);


  //Auth - LogIn   PENDIENTE
  const [user, setUser] = useState({ user: "", password: "" })
  const [auth, setAuth] = useState();
  let pages = useNavigate();

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', true);
      pages('/')
    }
  }, [auth])


  const handleClick = (e) => {

    e.preventDefault();
    Ajax({
      url: 'http://localhost:5000/selectuserauth',
      settings: {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      },
      Success: (json) => {
        if (json.success) {
          setAuth(true);

        } else {
          setAuth(false)
          window.alert(json.message)
        }

      },
      Error: (error) => {
        console.log(error)
      }
    })
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  //=======================

  return (
    <div className='Login'>
      <div className="seccion">
        <div className="card glass" style={{
          boxShadow: `0px 8px 32px 0 ${currentMode === 'Light' ? '#000000' : '#ffffff'}50`,
        }}>
          <div className="card-content">
            <div className="imagen">
              <img src={logoUser} alt='logoUser' />
            </div>
            <div className="rol-Admin">
              <h3>{rol}</h3>
            </div>

            <form id="login-form" className='login-form'>
              <div className="input-form in-Text">
                <label htmlFor="user" className="form-label">Usuario</label>
                <input onChange={(e) => handleChange(e)} type="text" className="form-control"
                  id="user" name="user" aria-describedby="emailHelp"
                  required placeholder='Ingrese su usuario' value={user.user} />
              </div>
              <div className="input-form in-pass">
                <label htmlFor="pass" className="form-label">Contraseña</label>
                <input onChange={(e) => handleChange(e)} type="password" className="form-control"
                  id="pass" required
                  placeholder='Ingrese su contraseña' value={user.password}
                  name="password"
                />
              </div>
              <p className="warn-auth">Error</p>
              <button type="submit" className="btn-Submit" onClick={(e) => handleClick(e)}>Entrar</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
