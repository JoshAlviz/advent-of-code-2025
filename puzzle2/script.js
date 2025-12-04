const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('invalid-id-time')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const ranges = input.split(',')
		let addedIDs = 0
		for (let i = 0; i < ranges.length; i++) {
			const idPair = ranges[i].split('-')
												//type coercion in action hahaha
			for (let j = Math.round(idPair[0]); j <= idPair[1]; j++) {
				const stringified = j + ''
				if (stringified.length % 2 === 0) {
					const mid = stringified.length / 2
					const seq1 = stringified.substring(0, mid)
					const seq2 = stringified.substring(mid)

					if (seq1 === seq2) {
						addedIDs += Math.round(j)
					}
				}
			}
		}
		console.timeEnd('invalid-id-time')
		console.log('added invalid ids', addedIDs)
	})
}

// part1()

function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('invalid-id-time')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const ranges = input.split(',')
		let addedIDs = 0
		for (let i = 0; i < ranges.length; i++) {
			const idPair = ranges[i].split('-')
												//type coercion in action hahaha ||||| 5757673432 ||| 0000000
			for (let j = Math.round(idPair[0]); j <= idPair[1]; j++) {
				const stringified = j + ''
				
				if(checkPatterns(stringified)) {
					addedIDs += Math.round(j)
				} else {
					break
				}
			}
		}
		console.timeEnd('invalid-id-time')
		console.log('added invalid ids', addedIDs)
	})
}

function checkPatterns(stringified) {
	const length = stringified.length

	let divisibleBy = []
	for (let i = 0; i < Math.ceil(length / 2); i++) {
		if (length % (i + 2) === 0) {
			divisibleBy.push(i + 2)
		}
	}
	console.log(divisibleBy, divisibleBy.length, 'items.')

	if (divisibleBy.length !== 0) {
		//check for an answer through every divisor
		for (let i = 0; i < divisibleBy.length;  i++) {
			let offset = 0
			let status = 0
			while (status === 0) {
				//check an answer on the ith divisor
				for (let j = 0; j < length - divisibleBy[i]; j++) {
					console.log(stringified[j + offset])
					console.log(stringified[j + divisibleBy[i] + offset])
					if (stringified[offset] !== stringified[divisibleBy[i] + offset]) {
						status = -1
						break
					}
				}
				if (status !== -1) {
					status = 1
				} else {
					offset += divisibleBy[i]
				}
				
			}
			if (status === 1) {
				return true
			}
		}
	}
	let previous;
	for (let i = 0; i < length; i++) {
		previous = stringified[i]
		if (stringified[i] !== previous) {
			return false
		}
	}
	
	return true
}

part2()