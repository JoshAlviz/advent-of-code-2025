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

					if (Math.round(seq1) === Math.round(seq2)) {
						addedIDs += Math.round(j)
					}
				}
			}
		}
		console.timeEnd('invalid-id-time')
		console.log('added invalid ids', addedIDs)
	})
}

part1()