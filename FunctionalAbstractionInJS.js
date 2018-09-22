var jsc = require("jsverify");

var x = [1, 2, 3];
console.log("Mapping +1: ", x.map((x) => x+1));
console.log("The original array: ", x);

const fmap = (fn) => (
   (array) => array.map(fn));

console.log(fmap((x)=> x+1)([1,2,3]));

const id = (x) => x;

fmap(id) = id;

const compose = (fn1,fn2) => (
   (arg) => fn2(fn1(arg)));

fmap(compose(f,g)) = compose(fmap(f),fmap(g));

// forall (f : bool -> bool) (b : bool), f (f (f b)) = f(b).
var boolFnAppliedThrice =
  jsc.forall("bool -> bool", "bool", function (f, b) {
    return f(f(f(b))) === f(b);
  });

console.log(jsc.check(boolFnAppliedThrice));

console.log([] === []);

const equals = (x,y) => (JSON.stringify(x) === JSON.stringify(y));


var arrayInt = jsc.array(jsc.integer());

const fmap_law1 = jsc.forall(
    arrayInt, 
    (x) =>
        //fmap(id) == id
        equals(
            fmap(id)(x),
            id(x))
);

const fmap_law2 = jsc.forall(
    "integer -> integer", 
    "integer -> integer", 
    arrayInt, 
    (f,g,x) =>
        //fmap(compose(f,g)) = compose(fmap(f),fmap(g))
        equals(
            fmap(compose(f,g))(x),
            compose(fmap(f),fmap(g))(x)
        ));

console.log("First functor law satisfied?", jsc.check(fmap_law1));

console.log("Second functor law satisfied?", jsc.check(fmap_law2));
