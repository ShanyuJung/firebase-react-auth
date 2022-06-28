import { useEffect, useState } from "react";
import { Card, Button, Alert, Image, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import userPlaceholder from "../assets/user.png";

const Dashboard = () => {
  const [error, setError] = useState();
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const { currentUser, logout, getUserPhoto } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out.");
    }
  };

  useEffect(() => {
    const promise = getUserPhoto();
    promise
      .then((url) => {
        setUserPhotoUrl(url);
      })
      .catch((error) => {
        console.log(error);
        setUserPhotoUrl(null);
      });
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Container
            className="my-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "200px", height: "200px", overflow: "hidden" }}
          >
            <Image
              className="h-100 w-auto"
              src={userPhotoUrl ? userPhotoUrl : userPlaceholder}
            />
          </Container>
          <div className="w-100 text-center mb-3">
            <h4>
              {currentUser.displayName
                ? currentUser.displayName
                : currentUser.email}
            </h4>
          </div>
          <div className="w-100">
            <strong>Email:</strong>
            {currentUser.email}
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-4">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        <Button variant="link" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
