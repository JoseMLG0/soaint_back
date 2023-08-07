
// CONFIGURACION PREVIA
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// INICIALIZAR FIREBASE
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./soaint.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
};

// RUTAS
app.post("/uploadFile", (req, res) => {
    let data = '';
    req.on('data', function (chunk) { data += chunk; });
    req.on('end', async function () {
        const result = validateData(data);
        await uploadData(result);
        res.sendStatus(200);
    });
});


app.get("/getInfo/:id", async (req, res, next) => {
    const { id } = req.params;
    const fileRef = db.collection('file').doc(id);
    const doc = await fileRef.get();
    if (!doc.exists) {
        console.log('No existe el documento!');
        res.sendStatus(404);
    } else {
        console.log('Documento:', doc.data());
        res.send(doc.data());
    }
});

// INICIALIZACION DEL SERVIDOR

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
});


//Funciones

function validateData(data) {
    const resData = [];
    data = data.split('\r\n');
    data.forEach(element => {
        const item = element.split(',');
        if (item.length === 4) {
            resData.push(item.map(m => m.trim()))
        }
    });

    return resData;
}

async function uploadData(dataSet) {
    const headers = dataSet[0];
    for (let index = 1; index < dataSet.length; index++) {
        const element = dataSet[index];

        const dataToSet = {};

        dataToSet[headers[0]] = element[0];
        dataToSet[headers[1]] = element[1];
        dataToSet[headers[2]] = element[2];
        dataToSet[headers[3]] = element[3];

        await db.collection('file').doc(element[0]).set(dataToSet);
    }
}