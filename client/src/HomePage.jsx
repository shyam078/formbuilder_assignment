import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCard from "./FormCard";
import { NavLink, useNavigate } from "react-router-dom";

const HomePage  = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of forms from the backend
    axios
      .get("http://localhost:5000/api/forms")
      .then((response) => setForms(response.data))
      .catch((error) => console.error("Error fetching forms:", error));
  }, []);

  const handleView = (form) => {
    navigate(`/form/${form._id}`, { state: { form } });
    console.log(form)
  };

  const handleEdit = (form) => {
    // Implement edit logic, e.g., navigate to an edit page
    console.log("Editing form:", form);
  };

  const handleDelete = (id) => {
    console.log(id);
    
    // Implement delete logic, e.g., send a delete request to the backend
    axios
      .delete(`http://localhost:5000/api/forms/${id}`)
      .then(() => setForms(forms.filter((f) => f._id !== id)))
      .catch((error) => console.error("Error deleting form:", error));
  };

  return (
    <div>
      <h1>Welcome to Form.com</h1>
      <p>This is a simple form builder.</p>
      <button
        className="btn"
        style={{
          backgroundColor: "green",
          color: "white",
          fontSize: "10px",
          borderRadius: "5px",
        }}
      >
        <NavLink to="/form/create" style={{ color: "white" }}>
          CREATE NEW FORM
        </NavLink>
      </button>
      <div style={styles.container}>
        {forms.map((form) => (
          <FormCard
            key={form._id}
            form={form}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default HomePage ;
