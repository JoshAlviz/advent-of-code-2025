const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('math')
		if (err) {
			console.log(err)
		}
		const input = data.toString().split('\n').map(c => c.replace(/\s+/g, ' ').trim())
		const mathProblems = input.map(s => s.split(' '))
		let grandTotal = 0
		for (let i = 0; i < mathProblems[0].length; i++) {
			let answer = 0
			const operator = mathProblems[mathProblems.length - 1][i]
			for (let j = 0; j < mathProblems.length - 1; j++) {
				if (operator === '+') { 
					answer += Math.round(mathProblems[j][i])
				} else {
					answer === 0 
						? answer = mathProblems[j][i]
						: answer *= Math.round(mathProblems[j][i])
				}
			}
			grandTotal += answer
		}
		console.timeEnd('math')
		console.log(grandTotal)
	})
}

part1()

function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('math')
		if (err) {
			console.log(err)
		}
		const input = data.toString().split('\n').map(c => c.replace(/\r?\n|\r/g, ''))
		const mathProblems = input.map(s => s.split(''))
		const operators = mathProblems[mathProblems.length - 1].filter(c => c === '+' || c === '*')
		let grandTotal = 0
		let index = mathProblems[0].length - 1

		for (let i = operators.length; i > 0; i--) {
			let numbers = []

			//repeat until space column reached / repeat for one full math problem
			while (true) {
				let construct = ''
				//construct for one column
				for (let j = 0; j < mathProblems.length - 1; j++) {
					if (mathProblems[j][index] !== ' ') {
						construct += mathProblems[j][index]
					}
				}
				index--
				if (construct === '' || index < -1) {
					break
				}
				numbers.push(Math.round(construct))
			}

			//calculate the sum of the constructed numbers
			const answer = numbers.reduce((acc, n) => {
				if (operators[i - 1] === '+') {
					acc += n
				} else {
					acc === 0
					? acc = n
					: acc *= n
				}
				return acc
			}, 0)
			grandTotal += answer
		}
		console.timeEnd('math')
		console.log(grandTotal)
	})
}

part2()