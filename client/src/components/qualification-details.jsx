import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QualificationDetails = () => {
  const [qualification, setQualification] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    completion: "",
    description: "",
  });

  const { id } = useParams();
  const apiUrl = "/api";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchQualification = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        try {
          const response = await fetch(`${apiUrl}/qualifications/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch qualification");
          }

          const data = await response.json();
          setQualification({
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            completion: data.completion.split("T")[0],
            description: data.description,
          });
        } catch (error) {
          console.error("Error fetching qualification", error);
        }
      };

      fetchQualification();
    }
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQualification((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `${apiUrl}/qualifications/${id}`
      : `${apiUrl}/qualifications`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(qualification),
      });

      if (!response.ok) {
        throw new Error("Failed to save qualification");
      }

      navigate("/qualifications");
    } catch (error) {
      console.error("Error saving qualification", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">
        {id ? "Update Qualification" : " Create Qualification"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={qualification.title}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={qualification.firstName}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={qualification.lastName}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={qualification.email}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="completion">Completion Date</label>
          <input
            type="Date"
            id="completion"
            name="completion"
            value={qualification.completion}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={qualification.description}
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

export default QualificationDetails;
