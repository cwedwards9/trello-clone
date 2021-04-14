const router = require("express").Router();
require('dotenv').config();

// Unsplash images API
const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");

// Use environment varaible for unsplash access key
const apiKey = process.env.API_KEY;
const unsplash = createApi({ accessKey: apiKey, fetch: nodeFetch });


// GET route for getting Unsplash API data
router.get("/unsplash", (req, res) => {
    unsplash.collections.getPhotos({ collectionId: '86710447' })
    .then(result => {
        if (result.errors) {
            // handle error here
            res.status(500).json({ message: "Unable to retrieve images at this time." });
        } else {
            // handle success here
            res.json(result.response);
        }
    })
});

module.exports = router;