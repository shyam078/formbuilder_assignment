import { useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function EditForm() {
  const location = useLocation();
  const [form, setForm] = useState(location.state );
  const [editor, setEditor] = useState(false);
  const [addInput, setAddInput] = useState(false);
  const [inputFields, setInputFields] = useState(form.fields || []);
  const [inputEditor, setInputEditor] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [inputTitle, setInputTitle] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");

  console.log(form);
  
  const handleEditor = () => {
    setEditor(!editor);
  };

  const handleChange = (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      form: {
        ...prevForm.form,
        FormTitle: event.target.value, // Correctly update the nested FormTitle
      },
    }));
  };
  

  const handleAddInputEditor = () => {
    setAddInput(!addInput);
  };

  const addInputField = (type) => {
    setInputFields([
      ...inputFields,
      { type, id: Date.now(), title: "", placeholder: "" },
    ]);
  };

  const handleInputEditor = (editorTitle, index) => {
    setEditor(false);
    setInputEditor(true);
    setEditorTitle(editorTitle);
    setForm((prevForm) => ({
        ...prevForm,
        form: {
          ...prevForm.form.fields,
          type: editorTitle, // Correctly update the nested FormTitle
        },
      }));
    setCurrentIndex(index);
    setInputTitle(inputFields[index].title);
    setInputPlaceholder(inputFields[index].placeholder);
  };

  const handleChangeInputField = (field, value) => {
    const updatedFields = [...inputFields];
    updatedFields[currentIndex][field] = value;
    setInputFields(updatedFields);
  };

  const handleDeleteInputField = (id) => {
    const updatedFields = inputFields.filter((field) => field.id !== id);
    setInputFields(updatedFields);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/forms", { title: form.FormTitle, inputFields })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <div className="d-flex justify-content-center mt-2">
          <div className="text-center">
            <h1>EDIT FORM</h1>
            <div style={{ width: "70em" }}>
              <div className="d-flex justify-content-center">
                <div className="border border-dark p-2">
                  <div className="d-flex justify-content-center align-items-center" style={{ width: "40em" }}>
                  <h4 className="mb-0">{form.form.FormTitle}</h4>

                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-4"
                      style={{ cursor: "pointer" }}
                      onClick={handleEditor}
                    />
                  </div>
                  <br />
                  {form.form.fields.length > 0 && form.form.fields.map((field, index) => (
                    <div key={field.id} className="mt-2">
                      <label>
                        {field.title || field.type.toUpperCase()}:
                        <input
                          type={field.type}
                          style={{ width: "200px" }}
                          placeholder={field.placeholder || "Enter"}
                        />
                        <FontAwesomeIcon
                          icon={faPen}
                          className="ml-4"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleInputEditor(field.type.toUpperCase(), index)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="ml-3"
                          style={{ color: "#f90606", cursor: "pointer" }}
                          onClick={() => handleDeleteInputField(field.id)}
                        />
                      </label>
                    </div>
                  ))}
                  <br />
                  <button
                    type="button"
                    className="btn btn-outline-primary m-2"
                    onClick={handleAddInputEditor}
                  >
                    {addInput ? "CLOSE ADD INPUT " : "ADD INPUT "}
                  </button>
                  <br />
                  {addInput && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary mr-2 mt-2"
                        onClick={() => addInputField("text")}
                      >
                        TEXT
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mr-2 mt-2"
                        onClick={() => addInputField("number")}
                      >
                        NUMBER
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mr-2 mt-2"
                        onClick={() => addInputField("email")}
                      >
                        EMAIL
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mr-2 mt-2"
                        onClick={() => addInputField("password")}
                      >
                        PASSWORD
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mr-2 mt-2"
                        onClick={() => addInputField("date")}
                      >
                        DATE
                      </button>
                    </div>
                  )}
                  <br />
                  <button type="button" className="btn btn-success">
                    Submit
                  </button>
                </div>
                <div className="border border-dark p-2" style={{ width: "20em" }}>
                  <h4 className="mb-0">Form Editor</h4>
                  <br />
                  {editor ? (
                    <div>
                      <label>Current Title: </label>
                      <input
                        type="text"
                        value={form.form.FormTitle}
                        onChange={handleChange}
                        placeholder="Enter title"
                        />


                    </div>
                  ) : inputEditor ? (
                    <h6>{editorTitle}</h6>
                  ) : (
                    <h6>Select to see editor</h6>
                  )}
                  {inputEditor && (
                    <div>
                      <label>
                        Title:
                        <input
                          type="text"
                          value={inputTitle}
                          onChange={(event) => {
                            setInputTitle(event.target.value);
                            handleChangeInputField("title", event.target.value);
                          }}
                          placeholder="Enter input title"
                        />
                      </label>
                      <label>
                        Placeholder:
                        <input
                          type="text"
                          value={inputPlaceholder}
                          onChange={(event) => {
                            setInputPlaceholder(event.target.value);
                            handleChangeInputField("placeholder", event.target.value);
                          }}
                          placeholder="Enter placeholder"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={handleSubmit}
            >
              <NavLink to={"/"} style={{ color: "white" }}>
                CREATE FORM
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
