let spawnPoints = require('./config/spawn_points.json').SpawnPoints;

// Player Join
mp.events.add('playerJoin', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.outputChatBox('(' + player.id + ') ' + player.name + ' has joined the server.');
    player.health = 100;
    player.armor = 100;
});

// Player Death
mp.events.add('playerDeath', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
    player.armor = 100;
});