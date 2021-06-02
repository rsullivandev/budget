const express = require('express');
const fs = require('fs');
const { createWriteStream } = require('fs');
const app = express();
const port = process.env.PORT || 3005;
const dh = require('services/dateHelper')
const multer = require('multer');

const _dh = new dh.dateHelper(new Date('05-01-2021'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/input/${req.body.source.toLowerCase()}`);
    },
    filename: function (req, file, cb) {
        cb(null, `transactions_input_${_dh.getMonth()}${_dh.getYearShort()}_${Date.now()}.csv`);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.originalname.includes('.csv')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

const uploadFile = (req, filePath) => {
    return new Promise((resolve, reject) => {
        const stream = createWriteStream(filePath);

        stream.on('open', () => {
            console.log('Stream open ... 0.00%');
            req.pipe(stream);
        })

        stream.on('drain', () => {
            const written = parseInt(stream.bytesWritten);
            const total = parseInt(req.headers['content-length']);
            const pWritten = (written / total * 100).toFixed(2);
            console.log(`Processing ... ${pWritten}% done`);
        });

        stream.on('close', () => {
            console.log('Processing ... 100%');
            resolve(filePath);
        })

        stream.on('error', err => {
            console.error(err);
            reject(err);
        });

    });
};

app.get('/', (req, res) => {
    res.status(200).send(`Server up and running`);
});

app.get('/files/new', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.post('/files/new', (req, res) => {
    const filePath = `${__dirname}/image2.jpg`;
    uploadFile(req, filePath)
        .then(path => res.send({ status: 'success', path }))
        .catch(err => res.send({ status: 'error', err }));
});

app.get('/v2/files/new', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.post('/v2/files/new', upload.single('filename'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('Error: Please select a csv file for upload.');
    } else {
        const data = req.body.source;
        res.status(200).send(`file sourced from ${data} uploaded successfully`);
    }
});

app.get('/v2/files/new', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});