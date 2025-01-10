import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

// configuration
dotenv.config();
const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// view engine
app.set("view engine", "ejs");

// routes
app.get("/", (_req, res) => {
    res.render("home");
});

app.get('/r/:id', (req, res) => {
    const { id } = req.params;
    res.status(300).redirect(`/somewhere/${id}`);
});

app.get('/somewhere/:id', (req, res) => {
    res.send("Welcome!");
})

app.post('/submit', (req, res) => {
    const { baseurl } = req.body;
    console.log(`url: ${baseurl}`);
    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (!regex.test(baseurl)) {
      return res.status(400).json({ status: "Invalid URL" });
    }
    res.status(200).json({status: "OK"});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});