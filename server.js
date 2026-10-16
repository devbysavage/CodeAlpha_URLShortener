const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const crypto = require("crypto");
function generateShortCode() {
  return crypto.randomBytes(4).toString("hex");
}

const Url = require("./models/Url");


const app = express();
app.use(express.json());
app.use(express.static("public"));
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});
const PORT = 3000;



app.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.shortCode
    });

    if (!url) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).send("Server error");
  }
});



app.post("/api/shorten", async (req, res) => {
  try {
    const originalUrl = req.body.url;

    if (!originalUrl) {
      return res.status(400).json({
        error: "Please provide a URL"
      });
    } 
let parsedUrl;

try {
  parsedUrl = new URL(originalUrl);
} catch {
  return res.status(400).json({
    error: "Please provide a valid URL"
  });
}

if (
  parsedUrl.protocol !== "http:" &&
  parsedUrl.protocol !== "https:"
) {
  return res.status(400).json({
    error: "Only HTTP and HTTPS URLs are allowed"
  });
}

    
const existingUrl = await Url.findOne({
  originalUrl: originalUrl
});

if (existingUrl) {
  return res.status(200).json({
    message: "URL already shortened",
    shortCode: existingUrl.shortCode,
    originalUrl: existingUrl.originalUrl
  });
}


    const shortCode = generateShortCode();

    const newUrl = new Url({
      originalUrl: originalUrl,
      shortCode: shortCode
    });

   const savedUrl = await newUrl.save();
console.log("Saved document:", savedUrl);

    
res.status(201).json({
  message: "URL shortened and saved successfully",
  originalUrl: originalUrl,
  shortCode: shortCode,
  shortUrl: `http://localhost:3000/${shortCode}`
});


  } catch (error) {
    console.error("Error saving URL:", error.message);

    res.status(500).json({
      error: "Failed to shorten URL"
    });
  }
});




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    console.log("Database name:", mongoose.connection.name);
    console.log("MongoDB host:", mongoose.connection.host);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

