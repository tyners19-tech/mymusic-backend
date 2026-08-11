const express = require('express');
const router = express.Router();

const tracks = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: 203, type: 'audio', privacy: 'public', liked: true, plays: 12500 },
    { id: 2, title: 'Flowers', artist: 'Miley Cyrus', duration: 195, type: 'audio', privacy: 'friends', liked: false, plays: 8200 },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', duration: 203, type: 'audio', privacy: 'private', liked: true, plays: 6700 },
    { id: 4, title: 'Blinding Lights (Official)', artist: 'The Weeknd', duration: 243, type: 'video', privacy: 'public', liked: true, plays: 12500 },
    { id: 5, title: 'Flowers (Music Video)', artist: 'Miley Cyrus', duration: 215, type: 'video', privacy: 'public', liked: false, plays: 9200 },
];

router.get('/', (req, res) => {
    res.json(tracks);
});

router.get('/:id', (req, res) => {
    const track = tracks.find(t => t.id === parseInt(req.params.id));
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.json(track);
});

router.post('/claim', (req, res) => {
    const { trackId } = req.body;
    res.json({ success: true, message: `Трек ${trackId} добавлен в медиатеку`, trackId });
});

module.exports = router;
