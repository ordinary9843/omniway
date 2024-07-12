# Omniway
Pertest for backend developer

## Requirements
- Git
- Docker

## Optional
- Postman
- pgAdmin

## Build Steps
- Download repository: `git clone git@github.com:ordinary9843/omniway.git`
- Navigate to the project directory: `cd omniway`
- Copy the environment file: `cp .env.example .env`
- Fill in the following information in `.env`:
- **App:**
  - NODE_ENV: `production`
- **Database:**
  - POSTGRES_USER: `root`
  - POSTGRES_PASSWORD: `DWif&&pdZN*2eyXh`
  - POSTGRES_DB: `omniway`
- **JWT:**
  - JWT_SECRET: `2e1d9a8b018a7365f1c047ec89752a3841f3eaaea7e841b6a07fd1a5b35f8b2d`
- Start setting up Docker: `docker-compose up -d`
- Browsing to access `http://localhost/api/dummy-data`
- Or using Postman (Related settings are in `./postman`, need import `environment.json` & `collection.json`)

## Tests
Only write `services` unit tests, In the absence of `CICD`, currently execute unit tests in `docker-compose.yml`, also possible to run test on docker container:

- Enter the container: `docker exec -it omniway-backend bash`
- Run tests: `npm run test`