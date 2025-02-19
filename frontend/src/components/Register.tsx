import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // ✅ Loading state
  const [error, setError] = useState<string>(""); // ✅ Error message
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true); // ✅ Start loading
      setError(""); // Clear any previous error

      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: name,
        email,
        password,
      });

      console.log("Registration Successful:", response.data);
      alert("Registration successful!");

      // ✅ Save token and username
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", name);

      // ✅ Redirect to chat page
      navigate("/chat");
    } catch (error) {
      console.error("Registration Error:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error during registration");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Register Page</h1>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Display errors */}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "0 auto" }}
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

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
