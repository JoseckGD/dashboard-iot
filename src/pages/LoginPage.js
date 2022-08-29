import '../styles/LoginPage.css';
import logoUser from '../img/user.png';
import { useStateContext } from '../contexts/ContextProvider';

export const LoginPage = ({ rol }) => {

   const { currentMode } = useStateContext();

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
                        <input type="text" className="form-control"
                           id="user" aria-describedby="emailHelp"
                           required placeholder='Ingrese su usuario' />
                     </div>
                     <div className="input-form in-pass">
                        <label htmlFor="pass" className="form-label">Contraseña</label>
                        <input type="password" className="form-control"
                           id="pass" required
                           placeholder='Ingrese su contraseña' />
                     </div>
                     <p className="warn-auth">Error</p>
                     <button type="submit" className="btn-Submit">Entrar</button>
                  </form>

               </div>
            </div>
         </div>
      </div>
   )
}
