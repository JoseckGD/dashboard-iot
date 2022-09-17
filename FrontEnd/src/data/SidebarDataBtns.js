import homepage from '../img/homepage.png';
import exit from '../img/exit.png';
import userA from '../img/userAvatar.png'
// import Logo from '../img/Logo.png';

export const buttonsData = [
   {
      title: 'logo',
      btn: [
         {
            name: 'ROL',
            type: 'perfil',
            icon: userA,
         },
      ],
   },
   {
      title: 'Dashboard',
      btn: [
         {
            name: 'Home',
            type: 'primary',
            icon: homepage,
         },
         {
            name: 'Dispositivos',
            type: 'primary',
            icon: homepage,
         },
         {
            name: 'Usuarios',
            type: 'primary',
            icon: homepage,
         },
         {
            name: 'Reportes',
            type: 'primary',
            icon: homepage,
         },
      ],
   },
   {
      title: 'exit',
      btn: [
         {
            name: 'Logout',
            type: 'exit',
            icon: exit,
         },
      ],
   },
];