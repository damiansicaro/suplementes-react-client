# Suplementes SPA

Esta es la aplicación cliente (single page application) que consume el API server de productos Suplemente y cuentas de usuarios.

El archivo ```/src/helpers/config.js``` contiene la url de la API que utiliza el cliente en cada entorno (dev, produccion).

Para desplegar la aplicación, se debe crear un ```build``` mediante el script:
```
# npm run build
```
y copiarlo a la carpeta ```/var/www/suplementes.online``` del webserver productivo.
