
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
    const hexTable = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D", "E","F"]
    let divisionResult = value
    let hexNumber = []

    do{
        const division = divisionResult / 16
        const divisionResidue = divisionResult % 16
        divisionResult = !Number.isInteger(division)? Math.trunc(division) : division
        hexNumber.push(hexTable[divisionResidue])
        if(division < 16) {
           hexNumber.push(hexTable[divisionResult])
        }

    } while(divisionResult > 16 )
    return hexNumber.reverse().join("")
}

const hexToDecimal = (value) => {
    
}

console.log(decimalToHex(16))