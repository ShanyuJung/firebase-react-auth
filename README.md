# Firebase React Auth

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- Firebase Auth
- PrivateRoute

In the project, you can signup you own account with email and password, and set up you own nickname and user photo.

### `Firebase Auth`

Build this project with Firebase V9 and use `context` to manage auth states and following firebase functions.

- createUserWithEmailAndPassword
- signInWithEmailAndPassword
- sendPasswordResetEmail
- onAuthStateChanged
- signOut
- updatePassword
- updateProfile

User can `signup`,`login`,`logout`,`reset password by email` and `update user profile` by these firebase functions.

### `Firebase Storage`

Use Firebase Storage following firebase functions to manage user photo.

- ref
- getStorage
- uploadBytes
- getDownloadURL
- list

User can `upload image as personal photo`, uploading image only be allowed while auth login.

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
