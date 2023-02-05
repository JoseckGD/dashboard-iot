import React, { useState } from 'react'
import '../styles/stylesComponents/User.css'
import Gerente from '../img/gerente.png';
import Operador from '../img/operador.png';
import Administrador from '../img/administrador.png'
import UserAvatar from '../img/userAvatar.png'
import { useStateContext } from '../contexts/ContextProvider';
import { NavLink } from 'react-router-dom';

export const User = () => {
    const { rolUser,
        setAuthUser,
        handleCloseSesion,
        currentMode } = useStateContext();

    const [userInfo, setUserInfo] = useState(false);

    const closeSesion = () => {
        handleCloseSesion();
        setAuthUser(false);
        setUserInfo(false);
        window.localStorage.setItem('authUser', false);
    }

    const getIconUser = () => {
        switch (rolUser) {
            case 'Administrador':
                return Administrador
                break;


            case 'Gerente':
                return Gerente
                break;


            case 'Operador':
                return Operador
                break;

            default:
                return UserAvatar
                break;
        }
    }

    return (
        <>
            <div className='user' onClick={() => setUserInfo(true)}>
                <img src={getIconUser()} alt={rolUser} />
            </div>
            {userInfo &&
                <div className='userInfo'
                    style={{
                        filter: `drop-shadow(0 0 10px ${currentMode === 'Light' ? '#00000080' : '#ffffff80'})`
                    }}>
                    <h3 className='userClose' onClick={() => setUserInfo(false)}>x</h3>
                    <p className='userItem'>Rol: {rolUser}</p>
                    <NavLink
                        to={'/logout'}
                        className='Close userItem'
                        onClick={() => closeSesion()}
                    >
                        {'Cerrar Sesion'}
                    </NavLink>
                </div>
            }
        </>
    )
}
