function printFactorial (currentSerie, currentFactorial){
var serie = currentSerie +1;
var factorial = currentFactorial * serie;
console.log (serie, factorial);
setTimeout (()=> printFactorial(serie, factorial), 1000);
}
printFactorial(0,1);