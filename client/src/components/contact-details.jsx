import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactDetails = () => {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const { id } = useParams();
  const apiUrl = "/api";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        try {
          const response = await fetch(`${apiUrl}/contacts/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch contact");
          }

          const data = await response.json();
          setContact({
            email: data.email,
            phone: data.phone,
            message: data.message,
          });
        } catch (error) {
          console.error("Error fetching contact", error);
        }
      };

      fetchContact();
    }
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/contacts/${id}` : `${apiUrl}/contacts`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error("Failed to save contact");
      }

      navigate("/contacts");
    } catch (error) {
      console.error("Error saving contact", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">
        {id ? "Update Contact" : " Create Contact"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={contact.email}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={contact.phone}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            id="message"
            name="message"
            value={contact.message}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ContactDetails;
