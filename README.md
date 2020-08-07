# Todo list API
Implementing an simple API for a to-do list using `Node.js` + `Express` + `MySQL` as part of the `Internet Application Development` discipline.

## Installation and launch
1. The first step is to clone the repository and install all dependencies:
    ```
    # Get the latest snapshot
    git clone https://github.com/d9rs/todo-list-api.git myproject

    # Change directory
    cd myproject

    # Install NPM dependencies
    npm install
    ```
2. Next, you need to create a `.env` file and specify the necessary settings. An example of a completed file can be seen in `.env.example`.
3. Next, you need to perform migrations using the command:
    ```
    npx migrate up
    ```
4. Now you can start the application with the following commands:
    ```
    # For development
    npm run start:dev
    # For production
    npm run start:prod
    ```