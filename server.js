const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const boardRoutes = require("./routes/boards");
const listRoutes = require("./routes/lists");
const cardRoutes = require("./routes/cards");
const imagesRoute = require("./routes/bgImages");

const session = require("express-session");
const passport = require("passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({secret: "secretcodetrello", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport")(passport);


app.use("/api", userRoutes);
app.use("/api", boardRoutes);
app.use("/api", listRoutes);
app.use("/api", cardRoutes);
app.use("/api", imagesRoute);


// Require database models
const db = require("./models");

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => { 
    app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
});