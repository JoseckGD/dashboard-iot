import homepage from '../img/homepage.png';
import exit from '../img/exit.png';
import userA from '../img/userAvatar.png'
import dispositivo from '../img/iot.png'
import usuarios from '../img/usuarios.png'
import reportes from '../img/reportes.png'
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
            icon: dispositivo,
         },
         {
            name: 'Usuarios',
            type: 'primary',
            icon: usuarios,
         },
         {
            name: 'Reportes',
            type: 'primary',
            icon: reportes,
         },
      ],
   },
   // {
   //    title: 'exit',
   //    btn: [
   //       {
   //          name: 'logout',
   //          type: 'exit',
   //          icon: exit,
   //       },
   //    ],
   // },
];