Calculate all possible combinations for a given change using quarters, dimes, nickels and pennies (25, 10, 5 and 1 cent values respectively).

Use it at https://ddandev.github.io/coin-change-calculator/

Optional:
See it step by step! Click the button to enable log messages for each step calculated and display sum in table to confirm each result row is correct.

____

### How does it work?
//For each type of coin, starting at the most valued, check how many can "fit" within the remaining change. Then for each possible amount of that coin, do the same for the lesser ones. When it gets to pennies, add the remaining needed as pennies and "save" the finished set.

Starts at quarters, then for each amount of quarters including zero that fits into total change, checks how many dimes fit in the remaining value.

Then for each dime amount possible, check how many nickels can fit in remaining.

Then for each nickel amount possible, complete the remaining with pennies.

When set is finished with the remaining pennies, it is added to the Nickels list.

After checking pennies for each possible amount of nickels, the array of possible sets is returned to the dime instance where the items are spread and added to the list of possible sets in that instance.

Finished dimes are added to quarter arrays in the same way.

When this whole cycle finishes for all possible quarter amounts, the aggregated list of sets is returned by remainingCoin, spread and then returned by makeChange.

makeChange really only sets the starting point for the recursive remainingToCoin which does the whole thing.

```javascript
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
		return [iterationSet];
	} else {
		for (let currentCoins = 0; currentCoins <= maxCoins; currentCoins++) {
			iterationSet[coinPositionInSet] = currentCoins;
			let remainingChange = remaining - coinValue * currentCoins;

			possibleSets.push(...remainingToCoin(nextCoinValue, remainingChange, iterationSet));
		}
		return possibleSets;
	}
}
```

______
### Possible improvements

Very "big" total change inputs can take too long, freeze (specially on mobile) or even throw a Maximum call stack size exceeded error. This is worse with the step by step log enabled. Im currently limiting input to 999 but that's still a lot (takes a few seconds then unfreeezes).

Would be fun to add exchange calculation for actual full amounts accounting for bills too. In this case I would break down the algorithm into size steps so we don't calculate millions of possible combinations all the way down to pennies, but in steps of 100. For example all possible change within 100 dollars then all possible cent changes up to 99cents. Changes for more than 100 dollars would simply be 100 bills. This would solve the performance issue above too.

Would also be easy to implement a tracking of the current stock of each kind of bill and coin, as to entirely skip possibilities that would use more than what's available.