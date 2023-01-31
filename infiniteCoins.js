//Get input and display result
const changeInput = document.getElementById("makeChangeInput");
const resultDisplay = document.getElementById("makeChangeResults");
changeInput.addEventListener("change", () => {
	resultDisplay.innerHTML = "Thinking";
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
	console.log(typeof resultArray, resultArray);

	if (typeof resultArray !== "object") {
		resultDisplay.innerHTML = resultArray;
		return;
	}

	for (result of resultArray) {
		//test: display sum of each combination too
		// result.push(result[0]*25+result[1]*10+result[2]*5+result[3]*1)

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
            <th>Pennies (1)</th>
        </tr>` + resultHTML;
	resultDisplay.innerHTML = resultHTML;
}

displayResult(makeChange(changeInput.value));

//Calculate

function makeChange(totalChange) {
	let possibleCombinations = [];

	possibleCombinations.push(...remainingToCoin(25, totalChange, [0, 0, 0, 0]));

	return possibleCombinations;
}

function remainingToCoin(coinValue, remaining, currentSet) {
	let possibleCoinStarts = [];
	let maxCoins = Math.floor(remaining / coinValue);
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
		let iterationSet = [...currentSet];
		iterationSet[3] = remaining;
		console.log("finished one ", iterationSet);
		return [iterationSet];
	} else {
		for (let currentCoins = 0; currentCoins <= maxCoins; currentCoins++) {
			let remainingChange = remaining - coinValue * currentCoins;
			let iterationSet = [...currentSet];
			iterationSet[coinPositionInSet] = currentCoins;
			console.log(coinValue, currentCoins, coinPositionInSet, iterationSet);
			possibleCoinStarts.push(...remainingToCoin(nextCoinValue, remainingChange, iterationSet));
		}
	}
	return possibleCoinStarts;
}
