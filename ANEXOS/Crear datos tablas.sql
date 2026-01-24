-- Tabla: Caso (Depende de Compania)
INSERT INTO Caso
    (IDCaso, IDCompania, IDAsegurado)
VALUES
    (101, 1, 1),
    (102, 1, 2),
    (103, 3, 3),
    (104, 4, 4),
    (105, 5, 5),
    (106, 6, 6),
    (107, 7, 7),
    (108, 8, 8),
    (109, 9, 9),
    (110, 10, 10),
    (111, 11, 11),
    (112, 12, 12),
    (113, 13, 13),
    (114, 14, 14),
    (115, 15, 15),
    (116, 16, 16),
    (117, 17, 17),
    (118, 18, 18),
    (119, 19, 19),
    (120, 20, 20);

-- Tabla: Compania (Depende de Cobertura)
INSERT INTO Compania
    (IDCompania, IDCobertura, Nombre, Rut, Dv, Estado)
VALUES
    (1, 1, 'ASEGURADORA PORVENIR S.A.', '76598625', '7', 'Vigente'),
    (2, 2, 'ASSURANT CHILE COMPAÑÍA DE SEGUROS GENERALES S.A.', '76212519', '6', 'Vigente'),
    (3, 3, 'BCI SEGUROS GENERALES S.A.', '99147000', 'K', 'Vigente'),
    (4, 4, 'BNP PARIBAS CARDIF SEGUROS GENERALES S.A.', '96837640', '3', 'Vigente'),
    (5, 5, 'CHUBB SEGUROS CHILE S.A.', '99225000', '3', 'Vigente'),
    (6, 6, 'CONSORCIO NACIONAL DE SEGUROS S.A.', '96654180', '6', 'Vigente'),
    (7, 7, 'CONTINENTAL S.A.', '76039758', 'K', 'Vigente'),
    (8, 8, 'CONTEMPORA COMPAÑÍA DE SEGUROS GENERALES S.A.', '76981875', '8', 'Vigente'),
    (9, 9, 'EVEREST COMPAÑÍA DE SEGUROS GENERALES CHILE S.A.', '77591207', '3', 'Vigente'),
    (10, 10, 'FID CHILE SEGUROS GENERALES S.A.', '77096952', '2', 'Vigente'),
    (11, 11, 'HDI SEGUROS S.A.', '99061000', '2', 'Vigente'),
    (12, 12, 'LIBERTY MUTUAL SURETY SEGUROS CHILE S.A.', '78027718', '1', 'Vigente'),
    (13, 13, 'MAPFRE COMPAÑÍA DE SEGUROS GENERALES DE CHILE S.A.', '96508210', '7', 'Vigente'),
    (14, 14, 'METLIFE CHILE SEGUROS GENERALES S.A.', '76258793', '9', 'Vigente'),
    (15, 15, 'MUTUALIDAD DE CARABINEROS', '99024000', '0', 'Vigente'),
    (16, 16, 'ORION SEGUROS GENERALES S.A.', '76042965', '1', 'Vigente'),
    (17, 17, 'REALE CHILE SEGUROS GENERALES S.A.', '76743492', '8', 'Vigente'),
    (18, 18, 'RENTA NACIONAL COMPAÑÍA DE SEGUROS GENERALES S.A.', '94510000', '7', 'Vigente'),
    (19, 19, 'SEGUROS GENERALES SURAMERICANA S.A.', '99017000', '2', 'Vigente'),
    (20, 20, 'SOUTHBRIDGE COMPAÑÍA DE SEGUROS GENERALES S.A.', '99288000', '7', 'Vigente');

-- Tabla: Cobertura
INSERT INTO Cobertura
    (IDCobertura, Descripcion)
VALUES
    (1, 'Responsabilidad Civil'),
    (2, 'Daños por Agua'),
    (3, 'Robo Total'),
    (4, 'Incendio'),
    (5, 'Inundación'),
    (6, 'Cristales'),
    (7, 'Cerraduras'),
    (8, 'Granizo'),
    (9, 'Inundación'),
    (10, 'Accidentes Personales'),
    (11, 'Defensa Jurídica'),
    (12, 'Daños de Vehículo'),
    (13, 'Carga Peligrosa'),
    (14, 'Transporte Escolar'),
    (15, 'Desempleo'),
    (16, 'Incapacidad Temporal'),
    (17, 'Responsabilidad Civil Internacional'),
    (18, 'Robo'),
    (19, 'Lucro Cesante'),
    (20, 'Hurto');

-- Tabla: Asegurado (Depende de Caso)
INSERT INTO Asegurado
    (IDAsegurado, Nombre, ApellidoMaterno, ApellidoPaterno, Rut, Dv)
VALUES
    (1, 'Claudio', 'Reyes', 'Quiroga', '16428250', '3'),
    (2, 'María', 'González', 'López', '17896532', '1'),
    (3, 'Jorge', 'Martínez', 'Fernández', '19283746', '5'),
    (4, 'Ana', 'Soto', 'Ramírez', '20394857', '9'),
    (5, 'Luis', 'Vargas', 'Torres', '21436587', '0'),
    (6, 'Cecilia', 'Morales', 'Silva', '22547896', '2'),
    (7, 'Pedro', 'Castillo', 'Gutiérrez', '23658974', '4'),
    (8, 'Lucía', 'Rojas', 'Díaz', '24769085', '6'),
    (9, 'Fernando', 'Pérez', 'Alarcón', '25870196', '8'),
    (10, 'Sofía', 'Fuentes', 'Cruz', '26981207', 'K'),
    (11, 'Ricardo', 'Molina', 'Vega', '27012345', '1'),
    (12, 'Isabel', 'Navarro', 'Sánchez', '28123456', '3'),
    (13, 'Andrés', 'Silva', 'Ortiz', '29234567', '5'),
    (14, 'Patricia', 'Cárdenas', 'Rivas', '30345678', '7'),
    (15, 'Javier', 'Leiva', 'Campos', '31456789', '9'),
    (16, 'Gabriela', 'Bravo', 'Muñoz', '32567890', '0'),
    (17, 'Sergio', 'Cruz', 'Lara', '33678901', '2'),
    (18, 'Valentina', 'Orellana', 'Pinto', '34789012', '4'),
    (19, 'Diego', 'Silva', 'Salazar', '35890123', '6'),
    (20, 'Camila', 'Vega', 'Rojas', '36901234', '8');

--Tabla: Bienes
INSERT INTO Bienes
    (IDBienes, IDAsegurado, Descripcion)
VALUES
    (1, 1, 'Casa'),
    (2, 2, 'Departamento'),
    (3, 3, 'Automóvil'),
    (4, 4, 'Moto'),
    (5, 5, 'Camioneta'),
    (6, 6, 'Bicicleta'),
    (7, 7, 'Casa de Vacaciones'),
    (8, 8, 'Barco'),
    (9, 9, 'Jet Ski'),
    (10, 10, 'Casa en la Playa'),
    (11, 11, 'Departamento en la Ciudad'),
    (12, 12, 'Auto Clásico'),
    (13, 13, 'Moto de Carrera'),
    (14, 14, 'Camioneta 4x4'),
    (15, 15, 'Bicicleta de Montaña'),
    (16, 16, 'Cabaña en el Campo'),
    (17, 17, 'Yate'),
    (18, 18, 'Moto Acuática'),
    (19, 19, 'Casa en la Montaña'),
    (20, 20, 'Departamento de Lujo');

--Tabla: Recinto
INSERT INTO Recinto
    (IDRecinto, IDBienes, Direccion)
VALUES
    (1, 1, 'Calle Falsa 123, Puente Alto'),
    (2, 2, 'Avenida Siempre Viva 742, Las Condes'),
    (3, 3, 'Ruta 66 Km 45, Maipú'),
    (4, 4, 'Camino Real 89, Ñuñoa'),
    (5, 5, 'Boulevard Central 56, Vitacura'),
    (6, 6, 'Paseo del Lago 12, La Florida'),
    (7, 7, 'Calle del Sol 34, Providencia'),
    (8, 8, 'Avenida del Mar 78, Las Condes'),
    (9, 9, 'Calle de las Flores 90, Ñuñoa'),
    (10, 10, 'Camino de la Costa 23, Maipú'),
    (11, 11, 'Plaza Mayor 67, Santiago'),
    (12, 12, 'Callejón del Beso 45, Valparaíso'),
    (13, 13, 'Avenida de los Sueños 89, Viña del Mar'),
    (14, 14, 'Calle de la Luna 12, Concepción'),
    (15, 15, 'Paseo de la Vida 34, Temuco'),
    (16, 16, 'Camino de los Pinos 56, Puerto Montt'),
    (17, 17, 'Avenida del Viento 78, Antofagasta'),
    (18, 18, 'Calle de la Esperanza 90, Iquique'),
    (19, 19, 'Boulevard de la Paz 23, La Serena'),
    (20, 20, 'Plaza de la Libertad 45, Coquimbo');

--Tabla: Danos
INSERT INTO Danos
    (IDDanos, IDRecinto, Descripcion)
VALUES
    (1, 1, 'Daño por incendio en la cocina'),
    (2, 2, 'Robo de electrodomésticos'),
    (3, 3, 'Accidente automovilístico menor'),
    (4, 4, 'Caída de moto en terreno resbaladizo'),
    (5, 5, 'Daños por granizo en la carrocería'),
    (6, 6, 'Robo de bicicleta en parque'),
    (7, 7, 'Daño estructural en casa de vacaciones'),
    (8, 8, 'Daños por tormenta en el barco'),
    (9, 9, 'Accidente con jet ski en el lago'),
    (10, 10, 'Inundación en casa de playa'),
    (11, 11, 'Robo en departamento urbano'),
    (12, 12, 'Daños por choque en auto clásico'),
    (13, 13, 'Accidente de moto de carrera en pista'),
    (14, 14, 'Daños por volcamiento en camioneta 4x4'),
    (15, 15, 'Robo de bicicleta de montaña en sendero'),
    (16, 16, 'Daños por incendio en cabaña rural'),
    (17, 17, 'Daños por tormenta en yate'),
    (18, 18, 'Accidente con moto acuática en mar abierto'),
    (19, 19, 'Daños por caída de árbol en casa de montaña'),
    (20, 20, 'Robo en departamento de lujo');

--Tabla: CasoAsignado (Depende de Caso)
INSERT INTO CasoAsignado
    (IDCasoAsignado, IDCaso, IDPerfil, FechaAsignacion)
VALUES
    (1, 101, 2, '2024-01-15'),
    (2, 102, 3, '2024-01-16'),
    (3, 103, 2, '2024-01-17'),
    (4, 104, 3, '2024-01-18'),
    (5, 105, 2, '2024-01-19'),
    (6, 106, 3, '2024-01-20'),
    (7, 107, 2, '2024-01-21'),
    (8, 108, 3, '2024-01-22'),
    (9, 109, 2, '2024-01-23'),
    (10, 110, 3, '2024-01-24'),
    (11, 111, 2, '2024-01-25'),
    (12, 112, 3, '2024-01-26'),
    (13, 113, 2, '2024-01-27'),
    (14, 114, 3, '2024-01-28'),
    (15, 115, 2, '2024-01-29'),
    (16, 116, 3, '2024-01-30'),
    (17, 117, 2, '2024-01-31'),
    (18, 118, 3, '2024-02-01'),
    (19, 119, 2, '2024-02-02'),
    (20, 120, 3, '2024-02-03');

--Tabla: Perfil
INSERT INTO OpcionesPerfil
    (IDOpcionPerfil, IDPerfil, IDPagina, Descripcion)
VALUES
    (1, 1, 1, 'Acceso a página About'),
    (2, 1, 2, 'Acceso a página Config'),
    (3, 1, 3, 'Acceso a página Help'),
    (4, 1, 4, 'Acceso a página Login'),
    (5, 1, 5, 'Acceso a página Paso1'),
    (6, 1, 6, 'Acceso a página Paso2'),
    (7, 1, 7, 'Acceso a página Paso3'),
    (8, 2, 1, 'Acceso a página About'),
    (9, 2, 3, 'Acceso a página Help'),
    (10, 2, 4, 'Acceso a página Login'),
    (11, 2, 5, 'Acceso a página Paso1'),
    (12, 2, 6, 'Acceso a página Paso2'),
    (13, 3, 1, 'Acceso a página About'),
    (14, 3, 4, 'Acceso a página Login'),
    (15, 3, 5, 'Acceso a página Paso1');

-- Tabla: Pagina
INSERT INTO Pagina
    (IDPagina, Nombre, Url)
VALUES
    (1, 'about', ''),
    (2, 'config', ''),
    (3, 'help', ''),
    (4, 'login', ''),
    (5, 'paso1', ''),
    (6, 'paso2', ''),
    (7, 'paso3', '');


