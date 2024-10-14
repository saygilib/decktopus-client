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
import { useAuth } from "../../context/AuthProvider";
import { useNotification } from "../../context/NotificationContext";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { showError, showSuccess } = useNotification();
  const handleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const AuthenticationServiceObject = new AuthenticationServices();

  const handleSignin = async () => {
    if(username && password){
      try {
        await AuthenticationServiceObject.login({ username, password }).then(
          (res) => {
            if (res.data) {
              const { token, user } = res.data;
              auth.login(user.username, token, user.id);
              showSuccess("Login successful , redirecting.");
              navigate("/dashboard");
            } else {
              showError("User not found.");
              console.log("err");
            }
          }
        );
      } catch (error) {
        showError("User not found.");
        console.error("Error during signin:", error);
      }
    }
    else {
      showError("Missing information.")
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
              Sign In
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="position-relative ">
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
              onClick={handleSignin}
              className="mt-3 bg-purple sign-button"
            >
              Sign In
            </Button>
            <div className="text-center mt-2">
              If you are not a member <a href="/signup">click here</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
