-- BD V1=====================================================================================================
-- CREATE TABLE usuario(
--     id_usuario SERIAL PRIMARY KEY,
--     nombre varchar(100),
--     numero_telefono varchar(15),
--     contrasena varchar(100),
--     correo varchar(100),
--     rol varchar(15)
-- );

-- CREATE TABLE dispositivos_iot(
--     id_dispositivo SERIAL PRIMARY KEY,
--     nombre varchar(100),
--     tipo varchar(100),
--     estado varchar(50),
--     dato_medida varchar(50)
-- ); 
-- BD V2=====================================================================================================
-- CREATE TABLE IF NOT EXISTS public.dispositivo_iot
-- (
--     id_dispositivo_iot integer NOT NULL,
--     nombre character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     tipo character varying(15) COLLATE pg_catalog."default" NOT NULL,
--     estado boolean NOT NULL,
--     dato_medida character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     CONSTRAINT dispositivo_iot_pkey PRIMARY KEY (id_dispositivo_iot)
-- );

-- CREATE TABLE IF NOT EXISTS public.iot_energia
-- (
--     id_iot_energia integer NOT NULL,
--     nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     estado boolean NOT NULL,
--     reinicio_potencia boolean NOT NULL DEFAULT false,
--     reinicio_voltaje boolean NOT NULL DEFAULT false,
--     potencia_activa character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     potencia_aparente character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     factor_potencia character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     "VAB" character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     "VBC" character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     "VCA" character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     CONSTRAINT iot_energia_pkey PRIMARY KEY (id_iot_energia)
-- );

-- CREATE TABLE IF NOT EXISTS public.iot_proceso
-- (
--     id_iot_proceso integer NOT NULL,
--     nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     estado boolean NOT NULL,
--     reinicio boolean NOT NULL DEFAULT false,
--     energia_termica character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     flujo_acumulado character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     flujo_instantaneo character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     presion character varying(50) COLLATE pg_catalog."default" NOT NULL,
--     CONSTRAINT iot_proceso_pkey PRIMARY KEY (id_iot_proceso)
-- );

-- CREATE TABLE IF NOT EXISTS public.usuario
-- (
--     id_usuario integer NOT NULL DEFAULT nextval('usuario_id_usuario_seq'::regclass),
--     nombre character varying(100) COLLATE pg_catalog."default",
--     numero_telefono character varying(15) COLLATE pg_catalog."default",
--     contrasena character varying(100) COLLATE pg_catalog."default",
--     correo character varying(100) COLLATE pg_catalog."default",
--     rol character varying(15) COLLATE pg_catalog."default",
--     CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
-- );

-- ALTER TABLE IF EXISTS public.dispositivo_iot
--     ADD FOREIGN KEY (id_dispositivo_iot)
--     REFERENCES public.iot_energia (id_iot_energia) MATCH SIMPLE
--     ON UPDATE NO ACTION
--     ON DELETE NO ACTION
--     NOT VALID;


-- ALTER TABLE IF EXISTS public.dispositivo_iot
--     ADD FOREIGN KEY (id_dispositivo_iot)
--     REFERENCES public.iot_proceso (id_iot_proceso) MATCH SIMPLE
--     ON UPDATE NO ACTION
--     ON DELETE NO ACTION
--     NOT VALID;

-- END;


-- BD V3=====================================================================================================

CREATE TABLE IF NOT EXISTS public.dispositivo_iot
(
    id_dispositivo_iot integer NOT NULL,
    nombre character varying(100) COLLATE pg_catalog."default" NOT NULL,
    tipo character varying(15) COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL,
    dato_medida character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT dispositivo_iot_pkey PRIMARY KEY (id_dispositivo_iot)
);

CREATE TABLE IF NOT EXISTS public.iot_energia
(
    id_iot_energia integer NOT NULL,
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL,
    reinicio_potencia boolean NOT NULL DEFAULT false,
    reinicio_voltaje boolean NOT NULL DEFAULT false,
    potencia_activa character varying(50) COLLATE pg_catalog."default" NOT NULL,
    potencia_aparente character varying(50) COLLATE pg_catalog."default" NOT NULL,
    factor_potencia character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "VAB" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "VBC" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "VCA" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT iot_energia_pkey PRIMARY KEY (id_iot_energia)
);

CREATE TABLE IF NOT EXISTS public.iot_proceso
(
    id_iot_proceso integer NOT NULL,
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    estado boolean NOT NULL,
    reinicio boolean NOT NULL DEFAULT false,
    energia_termica character varying(50) COLLATE pg_catalog."default" NOT NULL,
    flujo_acumulado character varying(50) COLLATE pg_catalog."default" NOT NULL,
    flujo_instantaneo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    presion character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT iot_proceso_pkey PRIMARY KEY (id_iot_proceso)
);

CREATE TABLE IF NOT EXISTS public.usuario
(
    id_usuario integer NOT NULL,
    nombre character varying(100) COLLATE pg_catalog."default",
    numero_telefono character varying(15) COLLATE pg_catalog."default",
    contrasena character varying(100) COLLATE pg_catalog."default",
    correo character varying(100) COLLATE pg_catalog."default",
    rol character varying(15) COLLATE pg_catalog."default",
    CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
);
END;

-- BD V3.1 Nueva tabla para almacenar datos=====================================================================================================

CREATE TABLE IF NOT EXISTS public.datos
(
    dispositivo_iot character varying COLLATE pg_catalog."default" NOT NULL,
    hora character varying COLLATE pg_catalog."default",
    dato character varying COLLATE pg_catalog."default",
    fecha character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.datos
    OWNER to postgres;