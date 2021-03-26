const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const boardRoutes = require("./routes/boards");
const listRoutes = require("./routes/lists");
const cardRoutes = require("./routes/cards");

// Require database models
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api", userRoutes);
app.use("/api", boardRoutes);
app.use("/api", listRoutes);
app.use("/api", cardRoutes);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => { 
    app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
});