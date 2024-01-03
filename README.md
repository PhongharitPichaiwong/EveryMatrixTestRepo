
# Every Matrix Movie App

### System requirements
Dart SDK Version 2.18.0 or greater.
Flutter SDK Version 3.3.0 or greater.

### Description
This is a monorepo project structure.

├── app                             - Most important folder for shared files and utilities of frontend
    the Dart code..
    ├── movie_app                   - Shared project of frontend
├── backend                         - The most important folder for shared files and utilities of the backend
    ├── frontend                    - Shared files for frontend part (UI, Components)
    ├── backend                     - Shared files for the backend part (Node, JavaScript, TypeScript)
    the JavaScript, TypeScript code..
        ├── server.ts               - Starting point of the application
        ├── config
        │   ├── client.ts           - It is a client class instance for MongoDB
        │   └── dbConnection.ts     - It contains common database connection functions 
        ├── controllers             - It contains all database functions (CUID) for MongoDB 
        └── models                  - It contains all the models schema of the application
        └── routes                  - It contains all the routes of the application

 ### How to link all projects/modules on this monorepo (can skip for now)
 1. Go to the project root folder
 2. run command `dart pub get` via cmd
 3. run command `melos bs` via cmd

 ### How to run the backend project
 1. Go to the project root folder
 2. go to project path: `cd packages/backend` via cmd
 3. run command `npm install` via cmd    
 4. start the server by running the command `npm run start` via cmd You 
 *should get the message "Application started on URL http://localhost:8080" if the application started successfully 
 5. Test to see the data from my MongoDB by entering this url on the web browser

    ## Movies
    - To get all movies data: `http://localhost:8080/movies`
    - To get specified movie data from each category by using genre (e.g. genre = 'Adventure'): 
    `http://localhost:8080/movies/Adventure`
    - To get all movies with a specific tag (e.g. tags = [Fantasy, Action]):    
    `http://localhost:8080/movies/tags/Fantasy,Action`

    ## Users
    - To get all user's data: `http://localhost:8080/users`
    - To get specified user data by using user_id (return user data & all favorite movies data from this user): 
    `http://localhost:8080/users/609c3bc01c294d15b47c5d8a`


 ### How to run app project (movie_app: Flutter)
 1. Go to the project root folder
 2. go to project path: `cd apps/movie_app` via cmd
 3. Run command `dart pub get` via cmd
 3. Create & open an Android emulator e.g. `emulator -avd Pixel_4_API_33` via cmd    
 4. Open Vscode & go open file `lib/main.dart` &run the application (Android) via Vscode 
