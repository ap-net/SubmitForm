const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://adrianpiekarz3:qazxswedc1324@cluster0.kpbmsau.mongodb.net/submit.Adrian", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const FormSchema = new mongoose.Schema({
  customers: String,
  specialRequirements: String,
  excludedCustomers: String,
  prospectPositions: String,
});

const Form = mongoose.model("Form", FormSchema);

app.post("/api/form", async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new Form(formData);
    await newForm.save();
    res.status(200).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
