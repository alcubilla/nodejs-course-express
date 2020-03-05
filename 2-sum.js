function sum(num1, num2){
    return Number(num1) + Number(num2);
}

console.log(process.argv);
var result = sum (process.argv[2], process.argv[3]);

console.log (result);