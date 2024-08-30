import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CreateNewForm() {
  const [editor, setEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [addInput, setAddInput] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const [inputEditor, setInputEditor] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [inputTitle, setInputTitle] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const[TextFieldValue , setTextFieldValue] = useState(true);

  const handleEditor = () => {
    setEditor(!editor);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
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
    // setTextFieldValue(false);
    setEditor(false);
    setInputEditor(true);
    setEditorTitle(editorTitle);
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
    try {
      axios
        .post("http://localhost:5000/api/forms", { title, inputFields })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <div className="d-flex justify-content-center mt-2">
            <div className="text-center">
              <h1>CREATE NEW FORM</h1>
              <div style={{ width: "70em" }}>
                <div className="d-flex justify-content-center ">
                  <div className="border border-dark p-2">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ width: "40em" }}
                    >
                      <h4 className="mb-0">
                        {title ? title : "Untitled Form"}
                      </h4>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="ml-4"
                        style={{ cursor: "pointer" }}
                        onClick={handleEditor}
                      />
                    </div>
                    <br />
                    {inputFields.map((field, index) => (
                      <div key={field.id} className="mt-2">
                        <Box
                          component="form"
                          sx={{
                            display: "flex",
                            flexWrap: "wrap", // This allows wrapping to the next line if needed
                            gap: 2, // Space between the items
                            "& > :not(style)": { m: 1, width: "200px" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div
                            key={field.id}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <TextField
                            disabled={TextFieldValue}
                              id={`input-${field.id}`}
                              label={field.title || field.type.toUpperCase()}
                              variant="standard"
                              placeholder={field.placeholder || "Enter"}
                              value={field.value} // Assuming you have a value to control the input
                              // onChange={(e) => handleInputChange(e, index)} // Assuming you have a handleChange function
                              sx={{ width: "150px" }} // Adjust the width as needed
                            />
                            <FontAwesomeIcon
                              icon={faPen}
                              style={{ cursor: "pointer", marginLeft: "8px" }}
                              onClick={() =>
                                handleInputEditor(
                                  field.type.toUpperCase(),
                                  index
                                )
                              }
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{
                                color: "#f90606",
                                cursor: "pointer",
                                marginLeft: "8px",
                              }}
                              onClick={() => handleDeleteInputField(field.id)}
                            />
                          </div>
                        </Box>
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
                  <div
                    className="border border-dark p-2"
                    style={{ width: "20em" }}
                  >
                    <h4 className="mb-0">Form Editor</h4>
                    <br />
                    {editor ? (
                      <div>
                        <Box
                          component="form"
                          sx={{ "& > :not(style)": { m: 1, width: "15ch" } }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="standard-basic"
                            label="Title"
                            variant="standard"
                            value={title}
                            onChange={handleChange}
                          />
                        </Box>
                      </div>
                    ) : inputEditor ? (
                      <h6>{editorTitle}</h6>
                    ) : (
                      <h6>Select to see editor</h6>
                    )}
                    {inputEditor && (
                      <div>
                        <Box
                          component="form"
                          sx={{ "& > :not(style)": { m: 1, width: "15ch" } }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="standard-basic"
                            label="Enter input title"
                            variant="standard"
                            value={inputTitle}
                            onChange={(event) => {
                              setInputTitle(event.target.value);
                              handleChangeInputField(
                                "title",
                                event.target.value
                              );
                            }}
                          />
                        </Box>
                        <Box
                          component="form"
                          sx={{ "& > :not(style)": { m: 1, width: "15ch" } }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="standard-basic"
                            label="Enter placeholder"
                            variant="standard"
                            value={inputPlaceholder}
                            onChange={(event) => {
                              setInputPlaceholder(event.target.value);
                              handleChangeInputField(
                                "placeholder",
                                event.target.value
                              );
                            }}
                          />
                        </Box>
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
                {" "}
                <NavLink to={"/"} style={{ color: "white" }}>
                  CREATE FORM
                </NavLink>
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
