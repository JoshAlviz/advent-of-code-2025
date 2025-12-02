const fs = require('fs')

function extractPassword() {
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

extractPassword()