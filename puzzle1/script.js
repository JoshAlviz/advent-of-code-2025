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

part1()

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

			for (let j = 0; j < rotations[i]; j++) {
				dial += direction;
				dial > 99 && (dial = 0)
				dial < 0 && (dial = 99)
				dial === 0 && timesReached0++;
			}
		
			password += timesReached0
		}
		console.timeEnd('dial-time')
		console.log('password:', password)
	})	
}

part2()


//spent 8 hours trying to find a more senior solution..

// function part2() {
// 	fs.readFile('./puzzleinput.txt', (err, data) => {
// 		console.time('dial-time')
// 		if (err) {
// 			console.log(err)
// 		}
// 		const input = data.toString()
// 		const numbers = input.match(/\d+/g)

// 		const letters = input.match(/[LR]/g)
// 		const rotations = numbers.map(Number)
// 		let dial = 50
// 		let password = 0

// 		for (let i = 0; i < letters.length; i++) {
// 			let direction
// 			let timesReached0 = 0
// 			letters[i] === 'L' ? direction = -1 : direction = 1
// 			let steps = direction === 1 ? dial + (rotations[i]) : (dial - 100) + (rotations[i] * -1)
// 			if (dial !== 0) {
// 				// timesReached0 = direction === 1 ? Math.abs(Math.floor(steps / 100)) : Math.abs(Math.ceil(steps / 100))
// 				timesReached0 = Math.abs(Math.trunc(steps / 100))
// 			}
			
// 			dial = ((dial + (rotations[i] * direction)) % 100) % 100
// 			password += timesReached0
// 			console.log('dial', dial)
// 			console.log('times reached 0:', timesReached0)
// 		}
// 		console.timeEnd('dial-time')
// 		console.log('password:', password)
// 	})	
// }