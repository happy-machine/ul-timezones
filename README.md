# ul-timezones
![Screnshot](https://i.imgur.com/mWQfDRj.png)

API and UI for:\
**Univers labs Timezone exercise** 
<br></br>
### Installing the API
**Install dependencies** - inside the folder ./API *npm install*

### Installing the UI
**Install dependencies** - inside the folder ./clent *yarn install*

### Setup:
First make .env files in both folders. Copy the .example-env contents into the new .env files.
*make sure* that the port number in ./client/.env REACT_APP_API_PATH is the same as that in ./API/.env SERVER_PORT.  

Seed the database and test the app:

- *npm run migrate*
- *knex seed:run --knexfile=./CLI/knexfile.js*

The seeds in ./CLI will insert a seed user with a sha encoded key into the mySQL db.
To test the app with this user, use the example value for SECRET ("MYSECRETSTRING") in your new ./API/.env. The seeded user can login using username: root and password: "some_hash" in the UI's login form.

**Build and start the API** - *npm run dev* or *npm run watch* (hot reloading)  
**Build and start the UI** - *yarn start* 
<br></br>
### Other API Commands

- **Build and run tests** - *npm run test*
- **Run migrations** - *npm run migrate*
- **Rollback migrations** - *npm run rollback*
- **Run test migrations** - *npm run test-migrate*
- **Rollback test migrations** - *npm run test-rollback*
- **Lint** - *npm run lint*

