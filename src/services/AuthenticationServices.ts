import axios from "axios";

interface ISignupBody {
  username: string;
  email: string;
  password: string;
}
interface ILoginBody {
  username: string;
  password: string;
}
class AuthenticationServices {
  signUpUrl = "/signup";
  logInUrl = "/login";
  apiUrl = "http://localhost:3000/api";
  signup = (signupBody: ISignupBody) => {
    return axios.post(`${this.apiUrl}${this.signUpUrl}`, signupBody);
  };
  login = (loginBody: ILoginBody) => {
    return axios.post(`${this.apiUrl}${this.logInUrl}`, loginBody);
  };
}

export default AuthenticationServices;
