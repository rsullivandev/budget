const express = require('express');
const router = express.Router();
const { readdir } = require('fs/promises');

router.get('/', async (req, res) => {

    try {
        const mint = await readdir(`${__dirname}/../input/mint`)
        const usbank = await readdir(`${__dirname}/../input/usbank`)
        const files = [
            {
                source: "mint",
                file: mint
            }, {
                source: "usBank",
                file: usbank
            }
        ]
        res.status(200).json(files);
    } catch (e) {
        console.log(e);
        res.status(500).json("Error: " + e)
    }
})


//TODO - add new route to upload file

module.exports = router;