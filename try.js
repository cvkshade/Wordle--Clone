const calcAnimaLegs = (type, num) => {
    let counter = 0;
    for(let i = 0; i < num.length; i++) {
        counter += 2;    }

    console.log(`All you ${type} has ${counter} legs`);
};

calcAnimaLegs("Cow", 6);