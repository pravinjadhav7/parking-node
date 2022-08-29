const readline = require('readline');
const parking = require('./Controller/ParkingConroller')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let init_main = () => {
    rl.on('line', async (input) => {
        input = input.split(" ");
        switch (input[0]) {
            case ('create_parking_lot'):
                try {
                    let result = await parking.create(input[1]);
                    console.log(result);
                }
                catch (err) {
                    console.log("Creating Error:", err)
                }
                break;

            case ('park'):
                try {
                    if (input[1] && input[2]) {
                        const result = await parking.park(input[1].trim(), input[2].trim());
                        console.log(result);
                    }
                }
                catch (err) {
                    console.log("Parking Error:", err)
                }
                break;

            case ('leave'):
                try {
                    const result = await parking.leave(input[1]);
                    console.log(result);
                }
                catch (err) {
                    console.log("Parking Error:", err)
                }
                break;

            case ('status'):
                try {
                    const result = await parking.status();
                    console.log(result);
                }
                catch (err) {
                    console.log("Parking Error:", err)
                }
                break;

            case ('registration_numbers_for_cars_with_colour'):
                try {
                    const result = await parking.getRegistrationNumbersFromColor(input[1].trim());
                    console.log(result);
                }
                catch (err) {
                    console.log("Parking Error:", err)
                }
                break;

            case ('slot_numbers_for_cars_with_colour'):
                try {
                    const result = await parking.getSlotNumbersFromColor(input[1].trim());
                    console.log(result);
                }
                catch (err) {
                    console.log("Parking Error:", err)
                }
                break;

            case ('slot_number_for_registration_number'):
                try {
                    console.log(input)
                    const result = await parking.getSlotNumberFromRegNo(input[1]);
                    console.log(result);
                }
                catch (err) {
                    console.log("Parking Error:", err)
                }
                break;

            case ('exit'):
                rl.pause();
                break;

            default:
                console.log('Seems like an issue with command that you typed , please note predeifed commands are case sensitive and matched as per the description!');

        }
    })
}

rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? (yes/no) : ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});

init_main();

