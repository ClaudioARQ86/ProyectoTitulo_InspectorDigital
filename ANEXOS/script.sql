

CREATE TABLE Asegurado
(
    IDAsegurado INT PRIMARY KEY,
    Nombre VARCHAR(100),
    ApellidoMaterno VARCHAR(100),
    ApellidoPaterno VARCHAR(100),
    Rut VARCHAR(20),
    Dv VARCHAR(1)
);

CREATE TABLE Bienes
(
    IDBienes INT PRIMARY KEY,
    IDAsegurado INT,
    Descripcion VARCHAR(255),
    FOREIGN KEY (IDAsegurado) REFERENCES Asegurado(IDAsegurado)
);

CREATE TABLE Recinto
(
    IDRecinto INT PRIMARY KEY,
    IDBienes INT,
    Direccion VARCHAR(255),
    FOREIGN KEY (IDBienes) REFERENCES Bienes(IDBienes)
);

CREATE TABLE Danos
(
    IDDanos INT PRIMARY KEY,
    IDRecinto INT,
    Descripcion VARCHAR(255),
    FOREIGN KEY (IDRecinto) REFERENCES Recinto(IDRecinto)
);

CREATE TABLE Fotos
(
    IDFoto INT PRIMARY KEY,
    IDDanos INT,
    BinarioImagen VARBINARY(MAX),
    FOREIGN KEY (IDDanos) REFERENCES Danos(IDDanos)
);


CREATE TABLE Cobertura
(
    IDCobertura INT PRIMARY KEY,
    Descripcion VARCHAR(255)
);

CREATE TABLE Compania
(
    IDCompania INT PRIMARY KEY,
    IDCobertura INT,
    Nombre VARCHAR(100),
    Rut VARCHAR(20),
    Dv VARCHAR(1),
    Estado VARCHAR(20),
    FOREIGN KEY (IDCobertura) REFERENCES Cobertura(IDCobertura)
);

CREATE TABLE Caso
(
    IDCaso INT PRIMARY KEY,
    IDCompania INT,
    IDAsegurado INT,
    FOREIGN KEY (IDCompania) REFERENCES Compania(IDCompania),
    FOREIGN KEY (IDAsegurado) REFERENCES Asegurado(IDAsegurado)
);


CREATE TABLE Perfil
(
    IDPerfil INT PRIMARY KEY,
    Tipo VARCHAR(50)
);

CREATE TABLE Pagina
(
    IDPagina INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Url VARCHAR(255)
);

CREATE TABLE OpcionesPerfil
(
    IDOpcionPerfil INT PRIMARY KEY,
    IDPerfil INT,
    IDPagina INT,
    Descripcion VARCHAR(255),
    FOREIGN KEY (IDPerfil) REFERENCES Perfil(IDPerfil),
    FOREIGN KEY (IDPagina) REFERENCES Pagina(IDPagina)
);

CREATE TABLE CasoAsignado
(
    IDCasoAsignado INT PRIMARY KEY,
    IDCaso INT,
    IDPerfil INT,
    FechaAsignacion DATETIME,
    FOREIGN KEY (IDCaso) REFERENCES Caso(IDCaso),
    FOREIGN KEY (IDPerfil) REFERENCES Perfil(IDPerfil)
);

-- Tabla de Usuarios para autenticación
CREATE TABLE Usuario
(
    IDUsuario INT PRIMARY KEY IDENTITY(1,1),
    NombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    NombreCompleto VARCHAR(150),
    IDPerfil INT,
    Activo BIT DEFAULT 1,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    UltimoAcceso DATETIME,
    FOREIGN KEY (IDPerfil) REFERENCES Perfil(IDPerfil)
);

-- Índices para mejorar el rendimiento
CREATE INDEX IX_Usuario_NombreUsuario ON Usuario(NombreUsuario);
CREATE INDEX IX_Usuario_Email ON Usuario(Email);

-- Se agregar columnas para almacenar datos de paso2
ALTER TABLE Caso
ADD 
    DescripcionDanos NVARCHAR(MAX) NULL,
    Superficie DECIMAL(10,2) NULL,
    Volumen DECIMAL(10,2) NULL;