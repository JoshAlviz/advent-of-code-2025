const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('dial-time')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const numbers = input.match(/\d+/g)

		const letters = input.match(/[LR]/g)
		const rotations = numbers.map(Number)
		let dial = 50
		let password = 0

		for (let i = 0; i < letters.length; i++) {
			let direction;
			letters[i] === 'L' ? direction = -1 : direction = 1
			dial = ((dial + (rotations[i] * direction)) + 100) % 100
			dial === 0 && password++
		}
		console.timeEnd('dial-time')
		console.log('password:', password)
	})	
}

// part1()

//UNFINISHED :/
function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('dial-time')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const numbers = input.match(/\d+/g)

		const letters = input.match(/[LR]/g)
		const rotations = numbers.map(Number)
		let dial = 50
		let password = 0

		for (let i = 0; i < letters.length; i++) {
			let direction
			let timesReached0 = 0
			letters[i] === 'L' ? direction = -1 : direction = 1

			//whooo this took forever..
			let steps = direction === 1 ? dial + (rotations[i]) : (dial - 100) + (rotations[i] * -1)
			if (dial !== 0) {
				// timesReached0 = direction === 1 ? Math.abs(Math.floor(steps / 100)) : Math.abs(Math.ceil(steps / 100))
				timesReached0 = Math.trunc(steps / 100)
			}
			// if (Math.abs(steps) < 100) {
			// 	if (direction === -1 && steps < 0 && dial != 0) {
			// 		timesReached0++
			// 	}
			// 	if (steps === 0) {
			// 		timesReached0++
			// 	}
			// } else {
			// 	timesReached0 = Math.abs(Math.trunc(steps / 100))
			// }
			
			
			dial = (((dial + (rotations[i] * direction)) % 100) + 100) % 100
			password += Math.abs(timesReached0)
			console.log('dial', dial)
			console.log('times reached 0:', timesReached0)
		}
		console.timeEnd('dial-time')
		console.log('password:', password)
	})	
}

part2()