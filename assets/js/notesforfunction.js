local storage

let person = {
    name: "bob",
    age: 30,
    food: "pizza",
}

function displayName(firstName, lastName) {
    console.log(firstName, lastName);
}
//order of operations. two sum and a plus operator. so it first adds the numbers cause of the operator, and it goes back to the function it has two parameters, and its attacheing the sum to one parametr, and thinks you didnt pass another on
// when passing in more than one parameter, you must have a comma.
let sum = add(4, 5);
debugger;
displayName("bob" + 5, sum);

function add(num1, num2) {
    return num1 + num2;
}

//const means the value cannot be changed;
// text function jquery only one parameter;
