//debugs (log step by step and sum on table) enable:
//to remove this from code, delete this block (before next comment) and all lines starting with debugMessages ?
let debugMessages = false;
document.getElementById("enableLog").addEventListener("click", (e) => {
	debugMessages ? (debugMessages = false) : (debugMessages = true);
	displayResult(makeChange(changeInput.value));
});
const logBox = document.getElementById("stepsLog");
let logContents;

//Calculate
//Starts at quarters, then for each amount of quarters including zero that fits into total change, checks how many dimes fit in the remaining value.
//Then for each dime amount possible, check how many nickels can fit in remaining.
//Then for each nickel amount possible, complete the remaining with pennies.
//When set is finished with the remaining pennies, it is added to the Nickels list. 
//After checking pennies for each possible amount of nickels, the array of possible sets is returned to the dime instance where the items are spread and added to the list of possible sets in that instance.
//Finished dimes are added to quarter arrays in the same way.
//When this whole cycle finishes for all possible quarter amounts, the aggregated list of sets is returned by remainingCoin, spread and then returned by makeChange.
//makeChange really only sets the starting point for the recursive remainingToCoin which does the whole thing.

function makeChange(totalChange) {
	return [...remainingToCoin(25, totalChange, [0, 0, 0, 0])];
}

function remainingToCoin(coinValue, remaining, currentSet) {
	let possibleSets = [];
	let maxCoins = Math.floor(remaining / coinValue);
	let iterationSet = [...currentSet];

	let nextCoinValue;
	let coinPositionInSet;
	switch (coinValue) {
		case 1:
			coinPositionInSet = 3;
			nextCoinValue = 0;
			break;
		case 5:
			coinPositionInSet = 2;
			nextCoinValue = 1;
			break;
		case 10:
			coinPositionInSet = 1;
			nextCoinValue = 5;
			break;
		case 25:
			coinPositionInSet = 0;
			nextCoinValue = 10;
			break;
	}

	if (nextCoinValue === 0) {
		iterationSet[3] = remaining;
		debugMessages ? (logContents += "finished one, save it (going back up from pennies) > " + iterationSet + "\n") : null;
		return [iterationSet];
	} else {
		for (let currentCoins = 0; currentCoins <= maxCoins; currentCoins++) {
			iterationSet[coinPositionInSet] = currentCoins;
			let remainingChange = remaining - coinValue * currentCoins;

			debugMessages ? (logContents += "checking for " + currentCoins + " coins of value " + coinValue + "(max fit: " + maxCoins + "). Current set: " + iterationSet + "\n") : null;
			possibleSets.push(...remainingToCoin(nextCoinValue, remainingChange, iterationSet));
		}
		debugMessages ? (logContents += "going back up from " + coinValue + "\n") : null;
		return possibleSets;
	}
}

/////////////////////////////////////////////////
//Get input and display result on HTML webpage.//
/////////////////////////////////////////////////
const changeInput = document.getElementById("makeChangeInput");
const resultDisplay = document.getElementById("makeChangeResults");
changeInput.addEventListener("change", () => {
	resultDisplay.innerHTML = "Thinking";
	debugMessages ? (logContents = ``) : null;
	setTimeout(() => {
		if (changeInput.value > 500) {
			displayResult("Too much");
			return;
		}
		displayResult(makeChange(changeInput.value));
	}, 1);
});

function displayResult(resultArray) {
	let resultHTML = "";
	debugMessages ? (logContents += `--------------------\n--------------\nFINISHED ALL COMBINATIONS\nwith ` + resultArray.length + ` possibilities!\n--------------\n--------------\n`) : (logBox.innerText = ``);

	if (typeof resultArray !== "object") {
		resultDisplay.innerHTML = resultArray;
		logContents = "";
	} else {
		for (result of resultArray) {
			debugMessages ? result.push(result[0] * 25 + result[1] * 10 + result[2] * 5 + result[3] * 1) : null;

			resultHTML = `</tr>` + resultHTML;
			let newRow = "";
			for (coin of result) {
				newRow += `<td>` + coin + `</td>`;
			}
			resultHTML = `<tr>` + newRow + resultHTML;
		}
		resultHTML =
			`<tr>
    <th>Quarters (25)</th>
    <th>Dimes (10)</th>
    <th>Nickels (5)</th>
    <th>Pennies (1)</th>` +
			(debugMessages ? `<th>Sum</th>` : "") +
			`</tr>` +
			resultHTML;
		resultDisplay.innerHTML = resultHTML;
	}
	debugMessages ? (logBox.innerText = logContents) : null;
}

displayResult(makeChange(changeInput.value));
