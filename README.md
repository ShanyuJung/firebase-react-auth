# Firebase React Auth

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- Firebase Auth
- PrivateRoute

In the project, you can signup you own account with email and password, and set up you own nickname and user photo.

### `Firebase Auth`

Build this project with firebase V9 and use `context` to manage auth states and following firebase function.

- createUserWithEmailAndPassword
- signInWithEmailAndPassword
- sendPasswordResetEmail
- onAuthStateChanged
- signOut
- updatePassword
- updateProfile

User can `signup`,`login`,`logout`,`reset password by email` and `update user profile` by these firebase function.

### `PrivateRoute`

Build PrivateRoute to manage private and public pages, user can not direct to private pages like dashboard, update-profile page without login. If user want to visit private pages without login, will be redirected to login page.

```
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
```
