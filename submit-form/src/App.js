
import React, { useState } from "react";
import "./App.css";


const App = () => {
  
  const [formData, setFormData] = useState({
    customers: "",
    specialRequirements: "",
    excludedCustomers: "",
    prospectPositions: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Form data sent successfully!");
      } else {
        console.error("Form data failed to send.");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
    <div className="wrapper">
      <div className="box">
        <h1 className="header">
          What is your <br /> audience?
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="QuestionContainer">
            <label className="form-label">Who are your customers?</label>
            <div style={{ marginTop: 25 }}>
              <input
                className="form-input"
                type="text"
                name="customers"
                value={formData.customers}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="QuestionContainer">
            <label className="form-label">
              Are there any special requirements like technology, location etc.?
            </label>
            <div style={{ marginTop: 25 }}>
              <input
                className="form-input"
                type="text"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="QuestionContainer">
            <label className="form-label">
              What types of customers should be excluded?
            </label>
            <div style={{ marginTop: 25 }}>
              <input
                className="form-input"
                type="text"
                name="excludedCustomers"
                value={formData.excludedCustomers}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="QuestionContainer">
            <label className="form-label">
              What are the positions of your prospects?
            </label>
            <div style={{ marginTop: 25 }}>
              <input
                className="form-input"
                type="text"
                name="prospectPositions"
                value={formData.prospectPositions}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="ButtonContainer">
            <button className="submit-button" type="submit">
              Submit
            </button>

          </div>
        </form>
      </div>
    </div>
    </form>
  );
};

export default App;
