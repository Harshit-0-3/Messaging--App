import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Type-safe form event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;

      // Save JWT token to localStorage
      localStorage.setItem("token", token);
      alert("Login Successful!");

      // Redirect to the chat page
      navigate("/chat");
    } catch (err) {
      // Ensure error type safety
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed. Try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/">Register</a>
      </p>
    </div>
  );
};

export default Login;
