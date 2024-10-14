import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import AuthenticationServices from "../../services/AuthenticationServices";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const AuthenticationServiceObject = new AuthenticationServices();
  const { showError, showSuccess } = useNotification();
  const handleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSignup = async () => {
    if (username && password && email) {
      try {
        await AuthenticationServiceObject.signup({
          username,
          email,
          password,
        }).then((res) => {
          if (res.data) {
            showSuccess("Sign up successful , please login.");
            navigate("/signin");
          } else showError("Failed to sign up. Check your information.");
        });
      } catch (error) {
        showError("Failed to sign up. Check your information.");
        console.error("Error during signup:", error);
      }
    } else {
      showError("Missing information.");
    }
  };

  return (
    <div className="row signup-card">
      <div className="col-md-4 offset-md-4">
        {" "}
        <Card className="p-3">
          <CardContent>
            <div className="text-center">
              <img src={Logo} />
            </div>

            <Typography
              variant="h5"
              gutterBottom
              className="text-center d-block fw-bold mt-4"
            >
              Sign Up
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="position-relative ">
              {" "}
              <TextField
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isPasswordVisible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="cursor-pointer position-absolute eye-icon text-gray"
                  onClick={handleVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="cursor-pointer position-absolute eye-icon text-gray"
                  onClick={handleVisibility}
                />
              )}
            </div>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSignup}
              className="mt-3 bg-purple sign-button"
            >
              Sign Up
            </Button>
            <div className="text-center mt-2">
              Are you already a member <a href="/signin">click here</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
