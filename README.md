# api-ecommerce
An API using NodeJs, Express, Sequelize and Postgresql

Clone the repo and run "npm install" to get all the project dependancies.

Create a .env file in project root, create a variable call HASH_SECRET and give it a value.

The file config/config_dev.json needs the file name changing to config.json and the relevant details for your DB set up included.

Once the file has the correct details, run sequelize db:migrate and all project tables should be created.