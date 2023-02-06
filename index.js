require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const { exec } = require("child_process");

app.get('/deploy', (req, res) => {
    if (req.headers.authorization && req.headers.authorization == process.env.API_KEY) {
        exec(process.env.SCRIPT_PATH, (error) => {
            if (error) return res.status(500).send(error);
            return res.status(200).send();
        })
    } else {
        return res.status(403).send();
    }
})

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`Started Listening on port: ${PORT}`));