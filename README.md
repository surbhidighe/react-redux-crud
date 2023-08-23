This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# React Redux CRUD with json-server

This repository demonstrates a simple CRUD (Create, Read, Update, Delete) application built using React and Redux, integrated with a mock API server powered by json-server.

#### Features:

Create, Read, Update, and Delete operations on user data.
Utilizes Redux for state management to ensure a single source of truth.
Utilizes json-server to simulate a REST API for storing and retrieving user data.

![redux-crud](https://github.com/surbhidighe/react-redux-crud/assets/51822986/4a7f108a-bcbf-4c94-b6dc-d0547b16e9a2)

### Project Setup for React Redux CRUD with json-server

1. Clone the Repository:
```
git clone <repository-url>
```

2. Install Dependencies:
Navigate to the project directory and install the project dependencies using yarn

3. Start the Development Server:
```
yarn start
```

This will launch the React app in your default web browser. You can access it at http://localhost:3000.

4. Run json-server for Mock API:
```
json-server --watch src/Userdata/db.json --port 3001
```

This will start the mock API server, and you can access the API at http://localhost:3001.

Contributions are welcome! If you'd like to enhance this project or fix any issues, feel free to submit pull requests. Let's learn and build together.
