const util = require('../helpers/utils')
let Car = [];
let maxSize = 0;
let availableSlot = [];

// to create parking lot
let create = async (number) => {
    try {
        maxSize = parseInt(number);
        for (let i = 1; i <= maxSize; i++) {
            availableSlot.push(i)
        }
        return `Created a parking lot with ${availableSlot.length} slots`;
    } catch (err) {
        console.log("Creating Error:", err)
    }
}

let park = async (regNo, color) => {
    try {
        if (maxSize === 0) {
            return `Parking lot is not initiated`;
        } else if (maxSize === Car.length) {
            return `Sorry, Parking is full`;
        } else {
            let slot = availableSlot[0];
            Car.push({ 'slot': slot, 'regNo': regNo, 'color': color });
            // console.log("pushed to car",Car);
            availableSlot.shift();
            return `Allocated slot number: ${slot}`
        }
    }
    catch (err) {
        console.log("Creating Error:", err)
    }
}

let leave = async (slot) => {
    try {
        slot = parseInt(slot)
        if (maxSize === 0) {
            if (Car.length === 0) {
                return `Parking is empty.`
            } else {
                return `Parking lot is not initiated.`;
            }
        }
        else {
            // car length > 0
            if (await util.search(slot, Car)) {
                Car = await util.remove(slot, Car);
                availableSlot.push(slot);
                availableSlot.sort();
                return `Slot numbmer ${slot} is free`;
            } else {
                return `Slot ${slot} is already empty`;
            }

        }
    }
    catch (err) {
        console.log("Creating Error:", err)
    }
}

let status = () => {
    try {
        if (maxSize === 0) {
            if (Car.length === 0) {
                return `Parking is empty.`
            } else {
                return `Parking lot is not initiated.`;
            }
        } else {
            console.log("Slot No.\tRegistration No.\tColor");

            Car.forEach(function (row) {
                console.log(row.slot + "\t         " + row.regNo + "\t         " + row.color);
            });

            availableSlot.sort();

            console.log(`Avilable Slot for parking: ${availableSlot.join(',')}`)

            return Car.length;
        }
    }
    catch (err) {
        console.log("Creating Error:", err)
    }
}

let getRegistrationNumbersFromColor = (color) => {
    try {
        if (maxSize === 0) {
            if (Car.length === 0) {
                return `Parking is empty.`
            } else {
                return `Parking lot is not initiated.`;
            }
        } else {
            let resultSet = [];
            Car.forEach(function (row) {
                if (row.color === color) {
                    resultSet.push(row.regNo);
                }
            });
            let finalResponse = '';
            for (let i = 0; i < resultSet.length; i++) {
                if (!(i == resultSet.length - 1)) {
                    finalResponse += resultSet[i] + ","
                } else {
                    finalResponse += resultSet[i];
                }
            }
            return finalResponse;
        }
    }
    catch (err) {
        console.log("Creating Error:", err)
    }
}

let getSlotNumbersFromColor = (color) => {
    try {
        if (maxSize === 0) {
            if (Car.length === 0) {
                return `Parking is empty.`
            } else {
                return `Parking lot is not initiated.`;
            }
        } else {
            let resultSet = [];
            Car.forEach(function (row) {
                if (row.color === color) {
                    resultSet.push(row.slot);
                }
            });

            let finalResponse = '';
            for (let i = 0; i < resultSet.length; i++) {
                if (!(i == resultSet.length - 1)) {
                    finalResponse += resultSet[i] + ","
                } else {
                    finalResponse += resultSet[i];
                }
            }
            return finalResponse;
        }
    }
    catch (err) {
        console.log("Creating Error:", err)
    }
}

let getSlotNumberFromRegNo = (regNo) => {
    try {
        if (maxSize === 0) {
            if (Car.length === 0) {
                return `Parking is empty.`
            } else {
                return `Parking lot is not initiated.`;
            }
        } else {
            let resultSet;
            Car.forEach(function (row) {
                if (row.regNo === regNo) {
                    resultSet = row.slot;
                }
            });
            if (resultSet === undefined) return `Not found`
            return resultSet;
        }
    }
    catch (err) {
        console.log("Creating Error:", err)
    }
}

module.exports = {
    create,
    park,
    leave,
    status,
    getRegistrationNumbersFromColor,
    getSlotNumbersFromColor,
    getSlotNumberFromRegNo
}