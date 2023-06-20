const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(dbJson);
});

// Post Note
router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newPost = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newPost);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

// Delete Note
router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newPosts = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(newPosts));
    res.json('Deleted Post');
});

module.exports = router;
