//kay, I gave in and used ChatGPT to help me understand the problem..
//specifially, what does it mean when it says eight adjecent positions?
//never would've thought that it would be all surrounding neighbors,
//including diagonals. But didn't used GPT for solving the problem itself,
//nor looked at any other code proposed, so this is probably eligible..

const fs = require('fs')

function part1() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('forklift')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const grid = input.split('\n').map(row => row.trim().split(''))
		let rollCount = 0
		
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (grid[i][j] === '@') {
					const adjacentItems = 	
					[
						grid?.[i - 1]?.[j - 1], grid?.[i - 1]?.[j], grid?.[i - 1]?.[j + 1],
						grid?.[i]?.[j - 1], grid?.[i]?.[j + 1],
						grid?.[i + 1]?.[j - 1], grid?.[i + 1]?.[j], grid?.[i + 1]?.[j + 1]
					];
					const rollsInAdjacent = adjacentItems.filter(char => char === '@').length
					if (rollsInAdjacent < 4) {
						rollCount++
					}
				}
			}
		}
		console.timeEnd('forklift')
		console.log(rollCount)
	})
}

part1()

function part2() {
	fs.readFile('./puzzleinput.txt', (err, data) => {
		console.time('forklift')
		if (err) {
			console.log(err)
		}
		const input = data.toString()
		const grid = input.split('\n').map(row => row.trim().split(''))
		let rollCount = 0
		
		while (true) {
			let removed = 0
			for (let i = 0; i < grid.length; i++) {
				for (let j = 0; j < grid[i].length; j++) {
					if (grid[i][j] === '@') {
						const adjacentItems = 	
						[
							grid?.[i - 1]?.[j - 1], grid?.[i - 1]?.[j], grid?.[i - 1]?.[j + 1],
							grid?.[i]?.[j - 1], grid?.[i]?.[j + 1],
							grid?.[i + 1]?.[j - 1], grid?.[i + 1]?.[j], grid?.[i + 1]?.[j + 1]
						];
						const rollsInAdjacent = adjacentItems.filter(char => char === '@').length
						if (rollsInAdjacent < 4) {
							grid[i][j] = 'x'
							rollCount++
							removed++
						}
					}
				}
			}
			//if after another whole cycle nothing was removed, we should've
			//already removed everything we (or they) can.
			if (removed === 0) {
				break
			}
		}
		console.timeEnd('forklift')
		console.log(rollCount)
	})
}

part2()