DECLARE
    @usuario int = 2

SELECT 
    u.NombreUsuario,
    p.Tipo,
    c.IDCaso,
    CONCAT(a.Nombre, ' ', a.ApellidoMaterno, ' ', a.ApellidoPaterno) AS NombreAsegurado,
    CONCAT(a.Rut, '-', a.DV) AS RutAsegurado,
    co.Nombre,
    cb.Descripcion AS Cobertura,
    b.Descripcion AS BienAsegurado,
    r.Direccion AS Recinto,
    d.Descripcion AS Danos
FROM Caso c
    INNER JOIN Asegurado a ON c.IDAsegurado = a.IDAsegurado
    INNER JOIN Compania co ON c.IDCompania = co.IDCompania
    INNER JOIN Cobertura cb ON co.IDCobertura = cb.IDCobertura
    INNER JOIN BIENES b ON a.IDAsegurado = b.IDAsegurado
    LEFT JOIN Recinto r ON b.IDBienes = r.IDBienes
    LEFT JOIN Danos d ON r.IDRecinto = d.IDRecinto
    LEFT JOIN Fotos f ON d.IDDanos = f.IDDanos
    INNER JOIN CasoAsignado ca ON c.IDCaso = ca.IDCaso
    INNER JOIN Perfil p ON p.IDPerfil = ca.IDPerfil
    INNER JOIN Usuario u ON u.IDPerfil = p.IDPerfil

WHERE IDUsuario = @usuario

--select * from usuario

