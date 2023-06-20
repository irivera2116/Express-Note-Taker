const route = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

route.get('/api/notes', async (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db,json', 'utf8'));
    res.json(dbJson);
});

// Post Note
route.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newPost = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    dbJson.push(newPost);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

// Delete Note
route.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');
    const dataJSON = JSON.pearse(data);
    const newPosts = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(newPosts));
    res.json('Deleted Post');
});

module.exports.route;
