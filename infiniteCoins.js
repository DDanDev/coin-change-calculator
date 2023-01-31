console.log(makeChange(12));
function makeChange(totalChange) {
	let possibleCombinations = [];

	// all pennies
	// possibleCombinations.push(remainingToPennies(totalChange, [0, 0, 0, 0]));

	// try nickels
	// possibleCombinations.push(...remainingToNickels(totalChange, [0, 0, 0, 0]));

	//try dimes
	// possibleCombinations.push(...remainingToDimes(totalChange, [0, 0, 0, 0]));

	possibleCombinations.push(...remainingToQuarters(totalChange, [0, 0, 0, 0]));
	// possibleCombinations.push(...remainingToCoin(25, totalChange, [0, 0, 0, 0]));
    
	return possibleCombinations;
}

function remainingToPennies(remaining, currentPenniesSet) {
	currentPenniesSet[3] = remaining;
	return currentPenniesSet;
}

function remainingToNickels(remaining, currentSet) {
	let possibleNickelStarts = [];
	let maxNickels = Math.floor(remaining / 5);

	for (let currentNickels = 0; currentNickels <= maxNickels; currentNickels++) {
		let remainingChange = remaining - 5 * currentNickels;
		let iterationSet = [...currentSet];
		iterationSet[2] = currentNickels;
		possibleNickelStarts.push(remainingToPennies(remainingChange, iterationSet));
	}

	return possibleNickelStarts;
}

function remainingToDimes(remaining, currentSet) {
	let possibleDimeStarts = [];
	let maxDimes = Math.floor(remaining / 10);

	for (let currentDimes = 0; currentDimes <= maxDimes; currentDimes++) {
		let remainingChange = remaining - 10 * currentDimes;
		let iterationSet = [...currentSet];
		iterationSet[1] = currentDimes;
		possibleDimeStarts.push(...remainingToNickels(remainingChange, iterationSet));
	}

	return possibleDimeStarts;
}

function remainingToQuarters(remaining, currentSet) {
	let possibleQuarterStarts = [];
	let maxQuarters = Math.floor(remaining / 25);

	for (let currentQuarters = 0; currentQuarters <= maxQuarters; currentQuarters++) {
		let remainingChange = remaining - 25 * currentQuarters;
		let iterationSet = [...currentSet];
		iterationSet[0] = currentQuarters;
		possibleQuarterStarts.push(...remainingToDimes(remainingChange, iterationSet));
	}

	return possibleQuarterStarts;
}

// function remainingToCoin(coinValue, remaining, currentSet) {
// 	let possibleCoinStarts = [];
// 	let maxCoins = Math.floor(remaining / coinValue);

// 	switch (coinValue) {
// 		case 1:
// 			coinPositionInSet = 3;
// 			break;
// 		case 5:
// 			coinPositionInSet = 2;
// 			break;
// 		case 10:
// 			coinPositionInSet = 1;
// 			break;
// 		case 25:
// 			coinPositionInSet = 0;
// 			break;
// 	}

//     for (let currentCoins = 0; currentCoins <= maxCoins; currentCoins++) {
//         let remainingChange = remaining - coinValue * currentCoins;
//         let iterationSet = [...currentSet];
//         iterationSet[coinPositionInSet] = currentCoins;
//         possibleCoinStarts.push(...remainingToCoin(remainingChange, iterationSet));
//     }

//     return possibleCoinStarts;
// }

// let input = 12;

// for (set of makeChange(input)) {
// 	console.log(set);
// }

// console.log(makeChange(input));
