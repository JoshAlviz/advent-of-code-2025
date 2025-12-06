const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('largest-joltage')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const banks = input.split('\n')
		let totalOutputJoltage = 0
		for (let i = 0; i < banks.length; i++) {
			totalOutputJoltage += findLargest(banks[i])
		}
		console.timeEnd('largest-joltage')
		console.log('total output joltage:', totalOutputJoltage)
	})
}

function findLargest(set) {
	let largest = 0
	for (let i = 0; i < set.length - 1; i++) {
		toCheck = set.substring(i)
		for (let j = 0; j < toCheck.length; j++) {
			if (toCheck[j + 1] !== undefined) {
				let candidate = toCheck[0] + toCheck[j + 1]
				if (Math.round(candidate) > largest) {
					largest = Math.round(candidate)
				}
			}
		}
	}
	return largest
}

part1()

function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('largest-joltage')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const banks = input.split('\n')
		let totalOutputJoltage = 0
		
		for (let i = 0; i < banks.length; i++) {
			const set = banks[i].trim()
			let index = 0
			let construct = ''
			for (let j = 0; j < 12; j++) {
				let largest = 0
				let indexOfLargest = 0
				for (let k = index; k <= set.length; k++) {
					if (Math.round(set[k]) > largest) {
						let leftOver = set.substring(k)
						if (leftOver.length + j >= 12) {
							largest = Math.round(set[k])
							indexOfLargest = k
						} else {
							break
						}
					}
				}
				construct += largest
				index = indexOfLargest + 1
			}
			totalOutputJoltage += Math.round(construct)
		}
		console.timeEnd('largest-joltage')
		console.log('total output joltage:', totalOutputJoltage)
	})
}

part2()