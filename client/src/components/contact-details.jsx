import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactDetails = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create contact");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      if (setUser) {
        setUser({ username: data.user.username });
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Contact Us</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone #</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactDetails;
