const hexTable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const decimalToBin = (value) => {
    let divisionResult = value;
    const initialBinValue = divisionResult % 2 === 0 ? 0 : 1;
    let binValue = [initialBinValue];
    do {
        const division = divisionResult / 2;
        divisionResult = !Number.isInteger(division) ? Math.trunc(division) : division;
        binValue.push(divisionResult % 2 === 0 ? 0 : 1);
    } while (divisionResult > 1);
    return binValue.reverse().join("");
};

const binToDecimal = (value) => {
    let binValue = value.toString().split("").reverse();
    let decimalValue = 0;
    for (let i = 0; i < binValue.length; i++) {
        decimalValue = decimalValue + (Number(binValue[i]) * Math.pow(2, i));
    }
    return decimalValue;
};

const decimalToHex = (value) => {
    let divisionResult = value;
    let hexNumber = [];

    do {
        const division = divisionResult / 16;
        const divisionResidue = divisionResult % 16;
        divisionResult = !Number.isInteger(division) ? Math.trunc(division) : division;
        hexNumber.push(hexTable[divisionResidue]);
        if (division < 16) {
            hexNumber.push(hexTable[divisionResult]);
        }
    } while (divisionResult > 16);
    return hexNumber.reverse().join("");
};

const hexToDecimal = (value) => {
    let decimalValue = 0;
    const hexValue = value.toString().split("");
    hexValue.map((item, index) => {
        const hexValueNumber = Number.isInteger(Number(item)) ? Number(item) : hexTable.findIndex(fitem => item === fitem);
        decimalValue = decimalValue + (hexValueNumber * Math.pow(16, (hexValue.length - 1) - index));
    });
    return decimalValue;
};

const decimalToOctar = (value) => {
    let divisionResult = value;
    let octarValue = [];
    do {
        const division = divisionResult / 8;
        const divisionResidue = divisionResult % 8;
        octarValue.push(divisionResidue);
        divisionResult = !Number.isInteger(division) ? Math.trunc(division) : division;
    } while (divisionResult !== 0);
    return octarValue.reverse().join("");
};

const octarToDecimal = (value) => {
    let octarValue = value.toString().split("");
    let decimalValue = 0;

    octarValue.map((item, index) => {
        decimalValue = decimalValue + (item * Math.pow(8, ((octarValue.length - 1) - index)));
    });
    return decimalValue;
};

const isValidBinary = (value) => /^[01]+$/.test(value);
const isValidDecimal = (value) => /^\d+$/.test(value);
const isValidHex = (value) => /^[0-9A-Fa-f]+$/.test(value);
const isValidOctal = (value) => /^[0-7]+$/.test(value);

const numberInput = document.getElementById('numberInput');
const conversionType = document.getElementById('conversionType');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('resultDisplay');
const fromType = document.getElementById('fromType');
const toType = document.getElementById('toType');

const conversionMap = {
    'dec-to-bin': {
        from: 'Decimal',
        to: 'Binario',
        func: decimalToBin,
        validate: isValidDecimal
    },
    'bin-to-dec': {
        from: 'Binario',
        to: 'Decimal',
        func: binToDecimal,
        validate: isValidBinary
    },
    'dec-to-hex': {
        from: 'Decimal',
        to: 'Hexadecimal',
        func: decimalToHex,
        validate: isValidDecimal
    },
    'hex-to-dec': {
        from: 'Hexadecimal',
        to: 'Decimal',
        func: hexToDecimal,
        validate: isValidHex
    },
    'dec-to-oct': {
        from: 'Decimal',
        to: 'Octal',
        func: decimalToOctar,
        validate: isValidDecimal
    },
    'oct-to-dec': {
        from: 'Octal',
        to: 'Decimal',
        func: octarToDecimal,
        validate: isValidOctal
    }
};

conversionType.addEventListener('change', updateConversionInfo);
convertBtn.addEventListener('click', performConversion);
numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        performConversion();
    }
});

function updateConversionInfo() {
    const selectedType = conversionType.value;
    if (selectedType && conversionMap[selectedType]) {
        fromType.textContent = conversionMap[selectedType].from;
        toType.textContent = conversionMap[selectedType].to;

        const placeholders = {
            'Decimal': 'Ej: 123',
            'Binario': 'Ej: 1101',
            'Hexadecimal': 'Ej: 7B',
            'Octal': 'Ej: 173'
        };
        numberInput.placeholder = placeholders[conversionMap[selectedType].from] || 'Ingresa el número aquí...';
    } else {
        fromType.textContent = 'Selecciona';
        toType.textContent = 'conversión';
        numberInput.placeholder = 'Ingresa el número aquí...';
    }
}

function showError(message) {
    resultDisplay.innerHTML = `<span class="error">❌ ${message}</span>`;
}

function showResult(result) {
    resultDisplay.innerHTML = `<span class="success">${result}</span>`;
}

function performConversion() {
    const inputValue = numberInput.value.trim();
    const selectedType = conversionType.value;

    if (!inputValue) {
        showError('Por favor ingresa un número');
        return;
    }

    if (!selectedType) {
        showError('Por favor selecciona un tipo de conversión');
        return;
    }

    const conversion = conversionMap[selectedType];

    if (!conversion.validate(inputValue)) {
        showError(`Formato inválido para ${conversion.from}. ${getFormatHint(conversion.from)}`);
        return;
    }

    try {
        const result = conversion.func(inputValue);
        showResult(result);
    } catch (error) {
        showError('Error en la conversión. Verifica el número ingresado.');
        console.error('Conversion error:', error);
    }
}

function getFormatHint(type) {
    const hints = {
        'Decimal': 'Solo números del 0-9',
        'Binario': 'Solo números 0 y 1',
        'Hexadecimal': 'Solo números 0-9 y letras A-F',
        'Octal': 'Solo números del 0-7'
    };
    return hints[type] || '';
}

updateConversionInfo();