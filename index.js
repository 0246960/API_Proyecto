// src/index.js
import app from "./app.js";
import connectDB from "./db.js";
import cors from "cors";

// Connect to MongoDB database
connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from http://localhost:3000
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  ); // Permite los métodos HTTP permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allows headers
  next();
});

// Start server
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
