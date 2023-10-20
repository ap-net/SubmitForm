import React, { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    customers: "",
    specialRequirements: "",
    excludedCustomers: "",
    prospectPositions: "",
  });

  const [showConfetti, setShowConfetti] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data sent successfully!");
        setFormData({
          customers: "",
          specialRequirements: "",
          excludedCustomers: "",
          prospectPositions: "",
        });
        setShowConfetti(true);
        // Hide confetti after 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);
      } else {
        console.error("Form data failed to send.");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="box">
        <h1 className="header">
          What is your <br /> audience?
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="QuestionContainer">
            <label className="form-label">
              Who are your customers?
              <div style={{ marginTop: 25 }}>
                <input
                  className="form-input"
                  type="text"
                  name="customers"
                  value={formData.customers}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </label>
          </div>

          <div className="QuestionContainer">
            <label className="form-label">
              Are there any special requirements like technology, location etc.?
              <div style={{ marginTop: 25 }}>
                <input
                  className="form-input"
                  type="text"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </label>
          </div>

          <div className="QuestionContainer">
            <label className="form-label">
              What types of customers should be excluded?
              <div style={{ marginTop: 25 }}>
                <input
                  className="form-input"
                  type="text"
                  name="excludedCustomers"
                  value={formData.excludedCustomers}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </label>
          </div>

          <div className="QuestionContainer">
            <label className="form-label">
              What are the positions of your prospects?
              <div style={{ marginTop: 25 }}>
                <input
                  className="form-input"
                  type="text"
                  name="prospectPositions"
                  value={formData.prospectPositions}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </label>
          </div>

          <div className="ButtonContainer">
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
};

export default App;
