USE [free-sql-db-2451406]
GO

DECLARE
    @idCaso int = 101,
    @rutAsegurado varchar(10) = '16428250-3'

SELECT */*
    c.IDCaso as IDCaso,
    co.Nombre as NombreCompania,
    cb.Descripcion as DescripcionCobertura,
    c.IDAsegurado as IDAsegurado,
    CONCAT(a.RUT, '-', a.DV) as RUTAsegurado,
    a.Nombre as NombreAsegurado,
    a.ApellidoMaterno as ApellidoMaternoAsegurado,
    a.ApellidoPaterno as ApellidoPaternoAsegurado*/
FROM Caso c
    INNER JOIN Asegurado a ON c.IDAsegurado = a.IDAsegurado
    INNER JOIN Compania co ON c.IDCompania = co.IDCompania
    INNER JOIN Cobertura cb ON co.IDCobertura = cb.IDCobertura
    INNER JOIN BIENES b ON a.IDAsegurado = b.IDAsegurado
    LEFT JOIN Recinto r ON b.IDBienes = r.IDBienes
    LEFT JOIN Danos d ON r.IDRecinto = d.IDRecinto
    LEFT JOIN Fotos f ON d.IDDanos = f.IDDanos
WHERE c.IDCaso = @idCaso AND CONCAT(a.RUT, '-', a.DV) = @rutAsegurado


ALTER TABLE Danos
ADD 
    Superficie DECIMAL(10,2) NULL,
    Volumen DECIMAL(10,2) NULL;