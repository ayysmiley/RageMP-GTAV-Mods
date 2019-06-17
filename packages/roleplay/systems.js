const rpc = require('./lib/rage-rpc.min.js');

/* SERVER CLOCK - Full day cycle 48 mins */
const getTime = () => {
    let date = new Date();
    let gameTime = [];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();

    gameTime[0] = (Math.floor(minutes / 2) + hours * 6) % 24;
    gameTime[1] = (Math.floor(seconds / 2) + minutes * 30) % 60;
    gameTime[2] = (Math.floor(milliseconds * 0.03) + seconds * 30) % 60;

    return gameTime;
};

const updateServerTime = () => {
    let sTime = getTime();
    mp.world.time.set(sTime[0], sTime[1], sTime[2]);
};
setInterval(updateServerTime, 1000);

rpc.register('callTime', () => {
    return getTime();
});