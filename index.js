const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// User details
const USER_FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    let alphabetConcat = "";

    data.forEach((item) => {
      if (!isNaN(item)) {
        // Numbers
        const num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]$/.test(item)) {
        // Alphabets
        alphabets.push(item.toUpperCase());
        alphabetConcat += item;
      } else {
        // Special Characters
        special_characters.push(item);
      }
    });

    const concat_string = alphabetConcat
      .split("")
      .reverse()
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join("");

    return res.json({
      is_success: true,
      user_id: `${USER_FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    return res.status(500).json({ is_success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
