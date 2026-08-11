const express = require('express');
const router = express.Router();

const users = [
    { id: 1, username: 'anna_music', first_name: 'Анна', online: true },
    { id: 2, username: 'max_rock', first_name: 'Максим', online: true },
    { id: 3, username: 'sergey_off', first_name: 'Сергей', online: false },
    { id: 4, username: 'dasha_pop', first_name: 'Дарья', online: true },
    { id: 5, username: 'pavel_house', first_name: 'Павел', online: false },
    { id: 6, username: 'olga_jazz', first_name: 'Ольга', online: true },
];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/online', (req, res) => {
    const online = users.filter(u => u.online);
    res.json(online);
});

module.exports = router;
