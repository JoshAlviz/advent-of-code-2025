const fs = require('fs')

function part1() {
	fs.readFile('./test.txt', (err, data) => {
		console.time('tachyon-beam')
		if (err){
			console.log(err)
		}
		const input = data.toString()
		const manifold = input.split('\n').map(s => s.trim())
		const start = findIndexOfS(manifold[0])
		//for some reason, I feel like being professional today :)
		if (start === null) {
			return 1
		}
		let indexesOfSplitters = []
		//start at 1, since the beam starts at S
		let timesSplitted = 1

		for (let i = 0; i < manifold.length; i++) {
			let splittersIndex = []
			for (let j = 0; j < manifold[i].length; j++) {
				if (manifold[i][j] === '^') {
					if (checkAffected(j, indexesOfSplitters)) {
						timesSplitted++
					}
					splittersIndex.push(j)
				}
			}
			indexesOfSplitters.push(...splittersIndex)
		}
		console.timeEnd('tachyon-beam')
		console.log(timesSplitted)
		return 0
	})
}

function findIndexOfS(manifoldStart) {
	for (let i = 0; i < manifoldStart.length; i++) {
		if (manifoldStart[i] === 'S') {
			return i
		}
	}
	return null
}

function checkAffected(index, indexesOfSplitters) {
	for (let i = indexesOfSplitters.length - 1; i >= 0; i--) {
		if (index === indexesOfSplitters[i] + 1 || index === indexesOfSplitters[i] - 1) {
			return true
		}
	}
	return false
}

part1()