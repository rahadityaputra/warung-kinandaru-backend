import express, { Response } from "express";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
const app = express();


// Init Middleware
app.use(express.json()); // Allows us to get data in req.body
app.use(cors()); // Enable CORS for all origins

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
// Simple root route
app.get("/api", (_, res: Response) => {
  res.send("API is running...");
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
