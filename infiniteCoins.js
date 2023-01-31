//debugs (log step by step and sum on table) enable:
//to remove this from code, delete this block (before next comment) and all lines starting with debugMessages ?
const logBox = document.getElementById("stepsLog");
let debugMessages = false;
document.getElementById("enableLog").addEventListener("click", (e) => {
	debugMessages ? (debugMessages = false) : (debugMessages = true);
	debugMessages ? logBox.classList.remove("hidden") : logBox.classList.add("hidden");
	displayResult(makeChange(changeInput.value));
});
let logContents = "";

//Calculate
//For each type of coin, starting at the most valued, check how many can "fit" within the remaining change.
//Then for each possible amount of that coin, do the same for the lesser ones. 
//When it gets to pennies, add the remaining needed as pennies and "save" the finished set.

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
		if (changeInput.value > 999) {
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
