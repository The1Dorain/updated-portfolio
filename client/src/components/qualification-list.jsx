import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QualificationList = () => {
  const [qualifications, setQualifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/qualifications", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(data.message);
        }

        const data = await response.json();
        setQualifications(data);
      } catch (error) {
        console.error(`Error fetching qualifications: ${error.message}`);
      }
    };
    fetchQualifications();
  }, []);

  const handleDelete = async (qualificationId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      console.error("No token found, redirecting to login");
      return;
    }

    try {
      const response = await fetch(`/api/qualifications/${qualificationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete qualification");
      }

      setQualifications((prevQualifications) =>
        prevQualifications.filter(
          (qualification) => qualification._id !== qualificationId
        )
      );
    } catch (error) {
      console.error(`Error deleting qualification: ${error.message}`);
    }
  };

  return (
    <div className="container mt4">
      <h1 className="text-center">Qualifications</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/qualification-details")}
      >
        Create New Qualification
      </button>

      {qualifications.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Completion</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {qualifications.map((qualification) => (
                <tr key={qualification._id}>
                  <td>{qualification.title}</td>
                  <td>{qualification.firstName}</td>
                  <td>{qualification.lastName}</td>
                  <td>{qualification.email}</td>
                  <td>{qualification.completion}</td>
                  <td>{qualification.description}</td>
                  <td>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() =>
                        navigate(`/qualification-details/${qualification._id}`)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(qualification._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="text-center">No qualifications available</p>
        </>
      )}
    </div>
  );
};

export default QualificationList;
