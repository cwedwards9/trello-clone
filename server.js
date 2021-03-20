const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({message: "it worked!"});
});

app.post("/test", (req, res) => {
    console.log(req.body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));