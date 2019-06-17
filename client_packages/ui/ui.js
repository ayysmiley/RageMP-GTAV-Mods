const rpc = require('./lib/rage-rpc.min.js');
let ui = mp.browsers.new("package://ui/index.html");
let speedVisible = false;
let player = mp.players.local;

mp.events.add('render', () => {
	/* Speedometer */
	if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
		if (speedVisible === false) {
			ui.execute("showSpeedometer();");
			speedVisible = true;
		}

		let vel1 = player.vehicle.getSpeed() * 2.236936;
		let vel = (vel1).toFixed(0);

		ui.execute(`updateSpeed(${vel});`);
	} else {
		if (speedVisible) {
			ui.execute("hideSpeedometer();");
			speedVisible = false;
		}
	}

	/* Time */
	rpc.callServer('callTime').then(numTime => {
		// Set to 12h + add AM/PM
		let ampm = '';
		if (numTime[0] <= 11) {
			ampm = 'AM';
			if (numTime[0] === 0) {
				numTime[0] = 12;
			}
		} else if (numTime[0] >= 13) {
			numTime[0] -= 12;
			ampm = 'PM';
		} else {
			ampm = 'PM';
		}

		cTime = numTime.map(String);

		// Add 0's before single digits
		if (cTime[0].length === 1) {
			cTime[0] = '0' + cTime[0];
		}
		if (cTime[1].length === 1) {
			cTime[1] = '0' + cTime[1];
		}

		ui.execute(`updateTime('${cTime[0]}', '${cTime[1]}', '${ampm}')`);
	});
});