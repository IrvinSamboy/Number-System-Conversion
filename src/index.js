
const decimalToBin = (value) => {
    let divisionResult = value
    let binValue = []
    do {
        const division = divisionResult/2
        divisionResult = !Number.isInteger(division)? Math.trunc(division) : division
        binValue.push(divisionResult % 2 === 0? 0: 1)
    } while(divisionResult > 0)
    return binValue.reverse().join("")
}

const binToDecimal = (value) => {
    let binValue = value.toString().split("").reverse()
    let decimalValue = 0
    console.log(bin)
    for(i = 0; i<binValue.length; i++){
        decimalValue = decimalValue + (Number(binValue[i]) * Math.pow(2, i))
        console.log(Number(binValue[i]) * Math.pow(2, i))
    }

    return decimalValue
}

console.log(decimalToBin(46))
console.log(binToDecimal("010111"))
