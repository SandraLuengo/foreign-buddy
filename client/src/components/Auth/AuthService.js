import axios from "axios";

export default class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/auth",
      withCredentials: true
    });
    this.service = service;
  }

  signup = state => {
    return this.service
      .post("/signup", {
        state
      })
      .then(response => response.data);
  };

  login = (email, password,rol) => {
    return this.service
      .post("/login", {
        email,
        password,
        rol
      })
      .then(response => response.data);
  };

  loggedin = () => {
    return this.service.get("/loggedin").then(response => response.data);
  };

  logout = () => {
    return this.service.get("/logout").then(response => response.data);
  };
}
