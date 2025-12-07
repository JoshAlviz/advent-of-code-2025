const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('database')
		if (err) {
			console.log(err)
		}
		input = data.toString().split('\n').map(s => s.trim())
		freshIngredientIDRanges = input.filter(n => n.includes('-'))
		availableIngredientIDs = input.filter(n => !n.includes('-')).slice(1)
		let freshIDs = 0
		
		for (let i = 0; i < availableIngredientIDs.length; i++) {
			for (let j = 0; j < freshIngredientIDRanges.length; j++) {
				const range = freshIngredientIDRanges[j].split('-').map(n => BigInt(n))
				if (checkIfWithinRange(range, BigInt(availableIngredientIDs[i]))) {
					freshIDs++
					break
				}
			}
		}

		console.timeEnd('database')
		console.log(freshIDs)
	})
}

function checkIfWithinRange(range, id) {
	if ((id < range[1] && id > range[0]) || id === range[0] || id === range[1]) {
		return true
	}
	return false
}

part1()


//consulted ChatGPT for this problem. the math is beyond my powers 😢
//learnt a lot though :)
function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('database')
		if (err) {
			console.log(err)
		}
		input = data.toString().split('\n').map(s => s.trim())
		freshIngredientIDRanges = input.filter(n => n.includes('-'))
		let freshIDs = 0
		let previousRanges = [[0, 0]]
		for (let i = 0; i < freshIngredientIDRanges.length; i++) {
			const range = freshIngredientIDRanges[i].split('-').map(Number)
			const result = countExclusiveRange(range[0], range[1], previousRanges)
			previousRanges.push([range[0], range[1]])
			freshIDs += result
		}
		console.timeEnd('database')
		console.log(freshIDs)
	})
}

function rangeSize(a, b) {
  return b - a + 1
}

function countExclusiveRange(start, end, countedRanges) {
	let remaining = [[start, end]]

	for (const [cs, ce] of countedRanges) {
		const next = []

		for (const [rs, re] of remaining) {
			if (ce < rs || cs > re) {
				next.push([rs, re])
			} else {
				rs < cs && next.push([rs, cs - 1])
				re > ce && next.push([ce + 1, re])
			}
		}
		remaining = next;
	}
	return remaining.reduce((sum, [a, b]) => sum + rangeSize(a, b), 0)
}

part2()