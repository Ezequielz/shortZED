# ShortZED
__Un acortador de urls__

## Correr en dev

1. Clonar el repositorio.
2. Instalar dependencias ```npm install```
3. Crear una copia del ***.env.template*** renombrarlo a ***.env*** y cambiar las variables de entorno.
4. levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de [Prisma](https://www.prisma.io/) ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```



## Correr en prod