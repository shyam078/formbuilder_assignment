import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCard from "./FormCard";
import { NavLink, useNavigate } from "react-router-dom";

export default function WelcometoForm() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of forms from the backend
    axios
      .get("http://localhost:5000/api/forms")
      .then((response) =>{ setForms(response.data);
        console.log(response);
        
      })
      .catch((error) => console.error("Error fetching forms:", error));
  }, []);

  const handleView = (form) => {
    navigate(`/form/${form._id}`, { state: { form } });
    console.log(form)
  };

  const handleEdit = (form) => {
    // Implement edit logic, e.g., navigate to an edit page
    navigate(`/form/${form._id}/edit`, { state: { form } });
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
    <div className="d-flex justify-content-center ">
      <div style={{ width: "40em" }}>
        <div className="d-flex justify-content-center mt-2 ">
          <div className="text-center">
            <h1>Welcome to Form.com</h1>
            <h6>This is a simple form builder</h6>
            <button type="button" className="btn btn-success">
            <NavLink to="/form/create" style={{ color: "white" }}>
          CREATE NEW FORM
        </NavLink>
            </button>
          </div>
        </div>
        <hr className="mt-2" />

        {forms && forms.length > 0 ? (
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
        ) : (
          <div>
            <h1>Forms</h1>
            <h6>You have no forms created yet</h6>
          </div>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
