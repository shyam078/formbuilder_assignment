import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
// import axios from "axios";
export default function ViewForm() {
  const location = useLocation();
  const { form } = location.state;

  const [enteredFieldData, setEnteredFieldData] = useState({});
  // const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    setEnteredFieldData(prevState => ({
      ...prevState,
      [index]: value
    }));
  };
  const handleclearForm = () => {
    console.log("clearing form");
    setEnteredFieldData({});

  };
  const handleSubmit = (event) => {
    event.preventDefault();

    window.alert("Form submitted. Thank you! open console for form data");
    handleclearForm();
    // navigate("/");
    console.log(enteredFieldData);
    // axios
    // .post("http://localhost:5000/api/formdata", { enteredFieldData })
    // .then((res) => console.log(res.data))
    // .catch((err) => console.log(err));
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }} className="d-flex flex-row justify-content-center">
        <h1>{form.FormTitle}:</h1>
        <form style={{ width: "40em" }}>
          {form.fields.map((field, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <label>{field.title}
                <input
                  type={field.title.toLowerCase()}
                  placeholder={field.placeholder}
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                  onChange={(event) => handleInputChange(field.title, event)}
                />
              </label>
            </div>
          ))}
          <button
        className="btn"
        style={{
          backgroundColor: "green",
          color: "white",
          fontSize: "10px",
          borderRadius: "5px",
        }} onClick={handleSubmit}
      >Submit
      </button>
        </form>
        
      </div>
      {/* <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Entered Data</h3>
        <pre>{JSON.stringify(enteredFieldData, null, 2)}</pre>
      </div> */}
    </div>
  );
}
