
const decimalToBin = (value) => {
    let divisionResult = value
    const initialBinValue = divisionResult % 2 === 0? 0 : 1
    let binValue = [initialBinValue]
    do {
        const division = divisionResult/2
        divisionResult = !Number.isInteger(division)? Math.trunc(division) : division
        binValue.push(divisionResult % 2 === 0? 0: 1)
    } while(divisionResult > 1)
    return binValue.reverse().join("")
}

const binToDecimal = (value) => {
    let binValue = value.toString().split("").reverse()
    let decimalValue = 0
    for(i = 0; i<binValue.length; i++){
        decimalValue = decimalValue + (Number(binValue[i]) * Math.pow(2, i))
    }

    return decimalValue
}

const decimalToHex = (value) => {
    const hexTable = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","F"]
    let divisionResult = value / 16
    let hexNumber = []

    if(Number.isInteger(divisionResult)){
        console.log(divisionResult)
        hexNumber.push(hexTable[divisionResult])
    }

    else {
        hexNumber.push(hexTable[value % 16])
    }

    divisionResult = value

    do{
        const division = divisionResult / 16
        divisionResult = !Number.isInteger(division)? Math.trunc(division) : division
        if(divisionResult > 16) {
            const divisionResidue = divisionResult % 16
            hexNumber.push(hexTable[divisionResidue])
        }
        else {
            hexNumber.push(hexTable[divisionResult])
        }

    } while(divisionResult > 16 )
    return hexNumber.reverse().join("")
}

console.log(decimalToHex(2742))