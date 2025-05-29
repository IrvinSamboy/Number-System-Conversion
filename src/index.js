
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


console.log(decimalToBin(46))

