const defaultWeights = [45, 25, 10, 5, 2.5];

const error = document.getElementById('error');
if (error === null) {
    console.error('Failed to find error element');
}

const input = document.getElementById('data');
if (input === null) {
    logError('Input was not found. Reload page');
}

const plates = document.getElementById('plates');
if (plates === null) {
    logError('Output box was not found. Reload page');
}

const side = document.getElementById('side');
if (plates === null) {
    logError('Side Output box was not found. Reload page');
}

const use55 = document.getElementById('use55');
if (use55 === null) {
    logError('Checkbox for 55 was not found. Reload page');
}

function logError(message = '') {
    if (error !== null) {
        error.innerHTML = message;
    }

    if (message !== '') {
        console.error(message);
        plates.innerHTML = '';
        if (side !== null) {
            side.innerHTML = ``;
        }
    }
}

function clearError() {
    logError('');
}

function getWeights(input, weights) {
    let total = input - 45;
    let returnWeights = [];

    for (const weight of weights) {
        const consideredWeight = (weight * 2);
        while (total - consideredWeight >= 0) {
            total -= consideredWeight;
            returnWeights.push(weight);
        }
    }
    if (total !== 0) {
        return [false, total];
    }

    return [true, returnWeights, (input - 45) / 2];
}

const form = document.getElementById('raw');
if (form === null) {
    logError('Calculate button was not found. Reload page');
} else {
    form.onsubmit = function (e) {
        e.preventDefault();
        if (input === null || plates === null) {
            return;
        }

        const value = input.valueAsNumber;
        if (isNaN(value)) {
            logError(`'${value}' is not a number`);
            return;
        }

        let weights = defaultWeights;
        if ((use55 !== null) && (use55.checked)) {
            weights = [55, ...defaultWeights];
        }

        const [success, result, half] = getWeights(value, weights);
        if (!success) {
            logError(`'${value}' is not valid with the available weights. Extra ${result} lbs`);
            return;
        }

        plates.innerHTML = '[ ' + result.join(', ') + ' ]';
        if (side !== null) {
            side.innerHTML = `${half}`;
        }

        clearError();
    }
}



