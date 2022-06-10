import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {
  const nicknameRef = useRef();
  const photoURLRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Those passwords didn't match.");
    }
    const promises = [];
    setIsLoading(true);
    setError("");
    setMessage("");

    promises.push(
      updateUserProfile(nicknameRef.current.value, photoURLRef.current.value)
    );

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Profile updated.");
      })
      .catch((e) => {
        setError("Failed to update profile.");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group id="nickname" className="mb-4">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                ref={nicknameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group id="photoURL" className="mb-4">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                ref={photoURLRef}
                defaultValue={currentUser.photoURL}
              />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same."
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-4">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same."
              />
            </Form.Group>
            <Button className="w-100" disabled={isLoading} type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Back to dashboard</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
