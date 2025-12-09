const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('tachyon-beam')
		if (err){
			console.log(err)
		}
		const input = data.toString()
		const manifold = input.split('\n').map(s => s.trim())
		const start = manifold[0].indexOf('S')
		//for some reason, I feel like being a little professional today :)
		if (start === -1) {
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

function checkAffected(index, indexesOfSplitters) {
	for (let i = indexesOfSplitters.length - 1; i >= 0; i--) {
		if (index + 1 === indexesOfSplitters?.[i] || index - 1 === indexesOfSplitters?.[i]) {
			return true
		} else if (index === indexesOfSplitters?.[i]){
			return false
		}
	}
	return false
}

part1()

function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('tachyon-beam')
		if (err){
			console.log(err)
		}
		const input = data.toString()
		const manifold = input.split('\n').map(s => s.trim())
		const width = manifold[0].length
		const start = manifold[0].indexOf('S')
		if (start === -1) {
			return 1
		}
		let indexesOfSplitters = []
		let paths = new Array(width).fill(0)
 		paths[start] = 1

		for (let i = 1; i < manifold.length; i++) {
			let newPaths = new Array(width).fill(0);
			let splittersIndex = []
			for (let j = 0; j < width; j++) {
				const n = paths[j]
				if (n === 0) {
					continue
				}

				if (manifold[i][j] === '.') {
					newPaths[j] += n
				} else {
					j > 0 && (newPaths[j - 1] += n)
					j + 1 < manifold[i].length && (newPaths[j + 1] += n)
				}
			}
			paths = newPaths
		}
		const timelines = paths.reduce((sum, v) => sum + v, 0)
		console.timeEnd('tachyon-beam')
		console.log(timelines)
		return 0
	})
}

part2()