var test = "https://www.theverge.com/2019/1/22/18193568/netflix-joins-mpaa-motion-picture-association-internet";


var test1 = test.slice(25);

var test2 = test1.split('/');
var final = test2.join('_');
console.log(final);