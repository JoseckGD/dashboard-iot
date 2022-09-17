CREATE TABLE usuario(
    id_usuario SERIAL PRIMARY KEY,
    nombre varchar(100),
    numero_telefono varchar(15),
    contrasena varchar(100),
    correo varchar(100),
    rol varchar(15)
);

CREATE TABLE dispositivos_iot(
    id_dispositivo SERIAL PRIMARY KEY,
    nombre varchar(100),
    tipo varchar(100),
    estado varchar(50),
    dato_medida varchar(50),
);