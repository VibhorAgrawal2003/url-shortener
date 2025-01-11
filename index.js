import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import { firebaseApp } from "./config.js";
import { getFirestore, collection, doc, getDoc, addDoc } from 'firebase/firestore/lite';

// configuration
dotenv.config();
const app = express();
const port = process.env.PORT;
const db = getFirestore(firebaseApp);
const links = collection(db, 'links');


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
    const docRef = doc(db, 'links', id);

    getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            console.log(`Redirecting user to: https://${docSnapshot.data().baseurl}`);
            res.status(302).redirect(`https://${docSnapshot.data().baseurl}`);
        } else {
            res.status(404).send("Not found");
        }
      }).catch((error) => {
        console.error('Error getting original URL document:', error);
      });
});

app.post('/submit', async (req, res) => {
    const { baseurl } = req.body;
    try {
        const urlDocRef = await addDoc(collection(db, 'links'), {
            baseurl: baseurl,
            createdAt: Date.now()
        });

        const newurl = `${req.get('host')}/r/${urlDocRef.id}`
        res.status(200).json({status: "OK", newurl });

    } catch (error) {
        console.error('Error adding URL:', error);
        res.status(500).json({ status: 'Error', message: 'Failed to add URL' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});