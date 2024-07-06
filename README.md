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
  - User: `root`
  - Password: `DWif&&pdZN*2eyXh`
  - Database: `omniway`
- **JWT:**
  - Secret: `2e1d9a8b018a7365f1c047ec89752a3841f3eaaea7e841b6a07fd1a5b35f8b2d`
- Start setting up Docker: `docker-compose up -d`
- Browsing or using Postman (Related settings are in `./postman`) to access `http://localhost/api/dummy-data`