# OficinaStore - Frontend

Frontend de la aplicacion OficinaStore - Interfaz web para visualizar articulos de oficina.

## Descripcion

Interfaz web estatica (HTML, CSS, JS) que consume la API del backend para mostrar un catalogo de articulos de oficina.

## Requisitos

- Python 3 para servir los archivos (ya viene instalado en CentOS)
- El backend debe estar corriendo en otra maquina virtual

## Configuracion de Red

### Cambiar IP del Backend

Este proyecto se conecta al backend. Cuando lo despliegues, necesitas configurar la IP correcta.

**Edita `js/app.js` linea 7:**

```javascript
const CONFIG = {
    URL_API: 'http://192.168.1.100:3000',  // <-- Cambia esta IP
    ...
};
```

Reemplaza `192.168.1.100` con la IP de tu maquina virtual Ubuntu donde corre el backend.

## Instalacion en CentOS (Maq. Virtual)

```bash
# Actualizar sistema
sudo yum update -y

# Instalar git (si no esta)
sudo yum install -y git

# Clonar repositorio
git clone [URL_DEL_REPO] frontend
cd frontend

# Servir con Python (puerto 8080)
python -m http.server 8080
```

## Verificar que Funciona

```bash
# Verificar que el servidor esta corriendo
curl http://localhost:8080/

# Verificar que el frontend puede contactar al backend
curl http://192.168.1.100:3000/api/articulos
```

## Abrir en Navegador

Desde tu computadora (no las VMs):
- `http://192.168.1.101:8080` (reemplaza con la IP de tu VM CentOS)

## Puertos

| Servicio | Puerto | Maquina Virtual |
|----------|--------|------------------|
| Frontend | 8080 | CentOS |
| Backend API | 3000 | Ubuntu |

## Estructura del Proyecto

```
frontend/
  index.html    # Pagina principal
  css/
    styles.css  # Estilos
  js/
    app.js      # Logica de la aplicacion
```

## Funcionamiento

1. El usuario abre `http://[IP_CENTOS]:8080` en el navegador
2. El frontend hace peticion a `http://[IP_UBUNTU]:3000/api/articulos`
3. El backend devuelve los datos JSON
4. El frontend renderiza las tarjetas de productos

## Solucion de Problemas

### Error "Failed to fetch"
- Verifica que el backend esta corriendo en Ubuntu
- Verifica que las IPs son correctas en `js/app.js`
- Verifica que el firewall permite conexiones entre VMs

### Pagina en blanco
- Abre las herramientas de desarrollo del navegador (F12)
- Revisa la consola por errores
- Verifica que los archivos CSS y JS se cargan correctamente

### CORS Errors
- El backend ya tiene CORS configurado para permitir cualquier origen
- Si persiste, verifica que la IP del backend en `js/app.js` es correcta
