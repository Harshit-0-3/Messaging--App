import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // ✅ Initialize the navigate hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted", { username: name, email, password });

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: name,
        email,
        password,
      });

      console.log("Registration Successful:", response.data);
      alert("Registration successful!");

      // ✅ Save JWT token (if returned) to localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // ✅ Redirect to the chat page
      navigate("/chat");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Error during registration");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Register Page</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>

      {/* ✅ Add the Login Link Here */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
