TypeScript (TS) Primer
====================
In this article we shall take a quick tour of the fundamental concepts in TS and how to apply them.
## Whats is TS?
TypeScript (TS) is a strict superset of JavaScript (JS) that adds on support for strong typing and advanced langauge features (such as interfaces, generics, decorators and many more). This massivley improves the expressibility of JS and promotes better structured code that is easier to maintain at scale.  The _'tsc'_ compiler transpiles TS down to pure JS (ES5 by default, but can also be made to target ES6) which may be executed either in the browser or in a Node.js runtime.  

## Setup Environment
The first step is to setup a development environment to play with. 
- **Installing TS**  
    The easiest way to install TS is to do it via _NPM_. This means we need to have _Node_ & _NPM_ installed.
    ```bash
    $ npm -g install typescript
    ```
    This should install TS in a global scope. On Windows, by default the installed path would be -
    ```bash
    $ where tsc

    $HOME/AppData/Roaming/npm/tsc
    $HOME/AppData/Roaming/npm/tsc.cmd
    ``` 
    We can check the installed TS version either by -
    ```bash
    $ tsc --version

    Version 2.8.1
    ```
    or listing the global _NPM_ packages -
    ```bash
    $ npm -g --depth=0 ls

    $HOME/AppData/Roaming/npm/
    +-- browserify@16.2.3
    +-- create-react-app@1.5.2
    `-- typescript@2.8.1
    ```
    This is the version I have installed at the time of writing this article.  

- **IDE - VS Code**  
    Because TS ultimately gets reduced to JS, it is possible to use any text editor and JS runtime. However for a productive development experince we shall be using VS Code, which comes with builtin support for TS such as deep intellisence, understanding type-declarationfiles, and integrated debugging. We can configure a TS project in VS Code with some minimal configuration. 

- **Manifest file - tsconig.json**  
    Typically the first step is to create a TS project configuration file called _tsconfig.json_. This file defines various options to be used, such as _compiler options_, _included/excluded files_ etc.  
    This file can be created manually and some basic standard options typed in (or copy-pasted from the web). Though now the better way to do this is using the _--init_ switch on the TS compiler.
    ```bash
    $ tsc --init
    ```
    This should create a _tsconfig.json_ file with a lot of options (most of which are commented out). We will just focus on the essentials for now - 
    ```javascript
    {
    "compilerOptions": {
        /* Basic Options */
        "target": "es5", /* Specify ECMAScript target version*/
        "module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        "sourceMap": true, /* Generates corresponding '.map' file. */
        // "lib": [], /* Specify library files to be included in the compilation. */
        // "declaration": true, /* Generates corresponding '.d.ts' file. */
        // "outFile": "./", /* Concatenate and emit output to single file. */
        // "outDir": "./",  /* Redirect output structure to the directory. */
    
        /* Strict Type-Checking Options */
        "strict": true, /* Enable all strict type-checking options. */
    
        /* Additional Checks */
        
        /* Module Resolution Options */
        "esModuleInterop": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */

        /* Source Map Options */

        /* Experimental Options */
        // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    }
    }
    ```  
    _Note that I have removed a lot of the commented lines for brevity._  
    With this VS Code can provide rich syntax highlighting and editing experince for the TS project.  

- **Trying it out**  
    At this stage we can actually try writing some simple TS code, compiling and running it. So we make a simple TS file _'basics.ts'_ with some _Hello World_ code - 
    ```typescript
    class Startup{
        public static main(args: any): number{
            console.log("Hello world!");
            return 0;
        }
    }
    Startup.main(null);
    ```
    A rudimentary class with a static method that prints to the console.
    To build and see the output we would do the following -
    ```bash
    $ tsc basics.ts
    $ node basics.js
    Hello World!
    ```
    The TS file gets compiled to JS and, then we can run it using Node.  

- **Build Task**  
    Now, even though we can manually build the _.ts_ file to JS from the commandline, this can become tedious as the codebase grows. Also as we shall see later we would want to run it directly from VS Code if we want to _debug_ the code.  
    We can configure VS Code to build the code using _Tasks_.  
    In almost any software development loop we would use tools for _linting_, _testing_, _building_, _packaging_, and _deploying_ (linters : ESLint, TSLint; build-tools : Ant, MSBuild, Make, Rake, Gulp, Grunt). As an IDE it is importnat to be able to execute these tools and analyze their results from within VS Code. This is what _tasks_ allow us to do.
  - To configure a _task_ within VS Code we can use the _"Command Palette"_ (F1 or Ctrl+Shift+p)
    - Start typing "Configure Default Build Task" and select that optoin. This will give us a dropdown with the options as shown - 
    ![config-build-task](config-build-task.png)
    In this case VS Code has detected that this is a TS project from the **tsconfig.json** file.  
  _Note that we can also configure other "Custom Tasks" if we need, for example to execute some shell scripts._

  - A shorter way is to directly invoke _"Run Build Task"_(Ctrl+Shift+b). It will again give us an option to select the _task to run_, and if it is the first time it will configure the build task.

  - **tsc: build** - Explicit build  
  If we select this option, it will create a **tasks.json** file, in a hidden folder **.vscode** within the project. This contains the configuration information for the behaviour of the _build task_.
  ```json
    {
      "version": "2.0.0",
      "tasks": [
          {
              "type": "typescript",
              "tsconfig": "tsconfig.json",
              "problemMatcher": [
                  "$tsc"
              ],
              "group": {
                  "kind": "build",
                  "isDefault": true
              }
          }
      ]
  }
  ```  
  The attributes in this file inform VS Code what the build behaviour should be.
  This is an explicit build option and we invoke it everytime we want to build using the "Run Build Task" (Ctrl+Shift+b) command.  
  This will build the TS files to JS without us having to invoke the compiler from the commandline.

  - **tsc: watch** - Build on change  
  If we want VS Code to automatically build everytime we modify and save a _".ts"_ file, wqe can configure the build to be in **watch** mode. We choose the **tsc: watch** option and this will create a **tasks.json** that looks like -
  ```json
  {
      "version": "2.0.0",
      "tasks": [
          {
              "type": "typescript",
              "tsconfig": "tsconfig.json",
              "option": "watch",
              "problemMatcher": [
                  "$tsc-watch"
              ],
              "group": {
                  "kind": "build",
                  "isDefault": true
              }
          }
      ]
  }
  ```  
  In this we can see that we are running the **"tsc"** compiler with the **"watch"** option. Now if we _run the build task_ (Ctrl+Sift+b), the task will start in **watch** mode and every time we save a change the TS files it will compile automatically.  
  _We can stop the running task when we are done or if we choose to._

- **Debug the code**  
    Running the JS file from the commandline is all fine, but when we need to debug it is better to do that from the IDE. To enable this, we do _"Start Debugging"_ (F5) and again VS Code will not know exactly what to do, so it prompts us to choose a runtime / debug-envirinment:
    ![choose-debug-env](select-debug-process.png) 
    _Note that VS Code comes with support for the Node.js runtime, but we can install debuggers for other runtimes such as Python, C++, C#, Chrome etc. if we need._  
    In this case we choose _Node.js_ and this will now create an additional file **launch.json** in the hidden _".vscode"_ folder. This file contains the configuration information to launch the applicaion in debug mode.
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Program",
                "program": "${workspaceFolder}\\basics.js",
                "outFiles": [
                    "${workspaceFolder}/**/*.js"
                ]
            }
        ]
    }
    ```
    The _"type"_ indicates what the runtime environment is, _"request"_ indicates if it should _launch_ or _attach_ and the _"program"_ points to the entry-point file.  
    Now we can set a breakpoint and start debugging (F5), step over, step into, watch and modify variables etc. as we would do in any other IDE.
    ![breakpoint](breakpoint.png)
    
    This also changes the _"sourceMap"_ attribute value in the _"tsconfig.json"_ - 
    ```json
        "sourceMap": true,  
    ```
    This creates the _"*.js.map"_ files (on build), that enables the debugger to map execution point to a location in the source code.

    - **"launch" v/s "attach"**  
        VS Code gives two debugging modes, each for a different workflow - _"launch"_ and _"attach"_.   
         - When we want the debugger to _"attach"_ to a running process, like we would do to debug a _browser app_, we use the _"attach"_ mode. The attributes for this configuration would indicate the details of the process to attach to. For _Chrome debugging_ we typically use this.

         - When we need the process to be launched first, like when debugging server-side applications we specify the _"launch"_ mode. For _Node.js_ applications we would typically use _"launch"_.  

## Variable Declarations
TS follows the exact same keywords and behaviour for variable declaration as ES6+. 
- **var**  
    The _var_ keyword used to be the way we declare variable till ES5. It declares a variable that has _function scope_. This is different from many other languages and has the potential for some un-intended behaviour - 
    ```typescript
    var x = 10; // has "global" scope
    function foo(){
        var x = 20;
        if (true){
            var x = 15;
            // actually modifies the 'x' declared above
            console.log(`2 - x = ${x}`);
            // 2 - x = 15
        }
        console.log(`3 - x = ${x}`);
        // 3 - x = 15
        // the function level 'x' got modified to 15
        for (var x=0; x<3; x++){

        }
        console.log(`4 - x = ${x}`);
        // 4 - x = 3
        // the function level 'x' got modified!
    }
    console.log(`1 - x = ${x}`);
    // 1- x = 10
    foo();
    ```
    Output >>
    ```bash
        1 - x = 10
        2 - x = 15
        3 - x = 15
        4 - x = 3
    ```
    This gets especillay confusing when _variable hoisting_ gets into the mix.
- **let**  
    ES6+ and TS intrioduces _let_ keyword which has _block level scope_. This is more natural and avoids many potential pitfalls. Let us change the above example to _let_ - 
    ```typescript
    let x = 10; // has "module" scope
    function foo(){
        let x = 20;
        if (true){
            let x = 15;
            // this is new 'x' within the "if" block
            console.log(`2 - x = ${x}`);
            // 2 - x = 15
        }
        console.log(`3 - x = ${x}`);
        // 3 - x = 20
        // the function level 'x' remains same
        for (let x=0; x<3; x++){
            // this 'x' is a different loop variable in this block
        }
        console.log(`4 - x = ${x}`);
        // 4 - x = 20
        // the function level 'x' remians same
    }
    console.log(`1 - x = ${x}`);
    // 1- x = 10
    foo();
    ```
    Output >>
    ```bash
        1 - x = 10
        2 - x = 15
        3 - x = 20
        4 - x = 20
    ```
- **const**  
    Similarly the _const_ keyword introduced in ES6+ and TS is used to declare variables that should not be _re-assigned_.
    ```typescript
    function foo(){
        const x = 23;

        x = x + 3;
        // compiler error - x is read-only

        const o = [1, 2, 3];
        o.push(4);
        console.log(o);
        // Array(4) [1, 2, 3, 4]
        // the content of 'o' can be modified

        o = o.concat([10, 20]);
        // compiler error - 'o' cannot be reassigned
    }
    foo();
    ```
- If a variable will not change stick to _const_. Trying to use _const_ more forces us to write safer code, which can be easier to make asynchronous.
- If the value can change stick to _let_ as that contains the variable to the minimum scope. 
- We would rarely find a reason to use _var_ instead of _let_.
- These are known as the _principle of least privilege_.

## Basic Types

A primary goal of _TS_ is to bring _static typing_ to our _JS_ development. _TS_ achieves this by enabling us to specify the type of variables. The `tsc` compiler checks the code to ensure that the usage of the variables conform to and are consitent with the specified type.  
However, once compiled it is plain _JS_ and therefore no type information (from _TS_) is available at runtime!  
Even though it reduces to _JS_ at runtime, the static type capability of _TS_ during developemnt vastly improves our ability to scale it across larger teams, ensure better quality code with less chance of errors that leak to execution time.  

### Primitive Types
This is the same set of _primitive data types_ from _JS_, namely - `number`, `string`, `boolean`, `null`, `undefined`, `symbol` (introduced in _ES6_). In _TS_ we can declare variables specifying these types as shown -
- **boolean**  
    `boolean` is the simplest data type representing `true` or `false` values -
    ```typescript
    const hasValue: boolean = [].length > 0;
    console.log(hasValue);
    // false
    ```

- **number**  
    Like _JS_ all numeric values are _floating point_ values and have the type `number`. They can have _decimal_, _hexadecimal_, _binary_ & _octal_ formats -
    ```typescript
    const dec: number = 45;
    const hex = 0xff;
    const bin = 0b1101;
    const oct = 0o76;
    console.log(oct);
    // 62
    ```
    Ofcourse everything is _JS_ at runtime so we are still susceptible to _floating point rounding errors_ -
    ```typescript
    // floating point rounding error
    console.log(0.1 + 0.2 === 0.3);
    // false
    ```

- **string**  
    _JS_ and _TS_ uses the `string` type to represent textual data. In _TS_ the variables are specified to the of the type `string`. String data are instances of the `String` class.  
    We can declare string lterals enclosing them in double quotes (`""`) or single quotes (`''`) - 
    ```typescript
    const s = "Hello there!";
    console.log(typeof(s));
    // string
    console.log(s.constructor.name);
    // String
    ```
    _Templated strings_ allow us to span multiple line as well as interpolate variables into it. This uses the `dash` (\`\`) to enclose the text and (`${}`) to paramterize the variables -
    ```typescript
    let name: string;
    let last_login: number;

    name = 'Alan';
    last_login = 3;

    const msg: string = `Welcome ${name}!

    You last login was ${last_login} days back.`;
    console.log(msg);
    /*
    Welcome Alan!

    You last login was 3 days back.
    */
    ``` 
### Arrays
In _JS_ an array is a _mutable_, _ordered_ collection which is _untyped_. _TS_ allows us to specify the type of the values that an array can hold. There are two ways to declare arrays in _TS_ -
- Array syntax  
```typescript
const evens: number[] = [2, 4, 6, 8];
evens.push(10);

console.log(evens);
// (5) [2, 4, 6, 8, 10]

console.log(`type of 'evens' = ${evens.constructor.name}`);
// type of 'evens' = Array
```
- Type parameter (generic) syntax
```typescript
const odds: Array<number> = [1, 3, 5];
odds.push(7);

console.log(`(evens.constructor === odds.constructor) = ${evens.constructor === odds.constructor}`);
// (evens.constructor === odds.constructor) = true
```
Whilst they are largely equivalent, there can be subtle differences in their usage. If we have an array that can hold a more than one data type (a _union type_ say), then we can directly do that with the _generic_ syntax -
```typescript
let stream: Array<boolean | number> = [false, 5.4, 6.2, false, 7.8, true];
```
If we wanted to do that with the _array syntax_ we would need to declare a type that represents the _union type_ -
```typescript
type stream_val = boolean | number;
let stream: stream_val[] = [false, 5.4, 6.2, false, 7.8, true];
```
### Tuples
_Tuples_ are a common data structure in many programming languages to represnt a compound type of fixed length. In _JS_ we handle this using arrays, but _TS_ provides a syntax to reprsent _tuples_ - 
```typescript
let rec: [number, string];
rec = [1001, "Alan"];

// Error - Tuples are not Commutative!!
rec = ["Bob", 1002]; 
```
Behind the scene a _tuple_ is just a _JS_ array -
```typescript
console.log(`rec.constructor = ${rec.constructor.name}`);
// rec.constructor = Array
```
### Enums
_TS_ brings _enums_ over and above the standard _JS_ types. _Enums_ are found in most other programming lanugages and provide a set of friendly names over ordinal values. In order to use an _enum_ type we first have to define it -
```typescript
enum Days {sun, mon, tue, wed, thu, fri, sat};
let day: Days = Days.mon;

console.log(`The day is ${day}`);
// The day is 1

day = Days.tue;
console.log(`The day is ${day}`);
// The day is 2

console.log(day === Days.wed - 1);
// true
```
_Note - how a variable of _enum_ type holds a number value._  
By default the value starts and `0` and increments by `1`, we can however change or specify these values as we desire -
```typescript
enum Magnitude {Ones = 1, Tens = 10, Hundreds = 100, Thousands = 1000};
let mag: Magnitude = Magnitude.Hundreds;

console.log(`Magnitude is ${mag}`);
// Magnitude is 100
```
A nifty thing about _enums_ in _TS_ is that we can easily go from the numberic value to its name as a string quite easily by accessing it using an index syntax -
```typescript
console.log(`Magnitude is in the ${Magnitude[mag]}`);
// Magnitude is in the Hundreds
```

### Any
If we wish to indicate that the value is not any specific type and can be _any_ type we use the `any` data type. This may be the case when working with dynamic content, or existing _JS_ libraries etc. Also note that `any` is different from specifying a value as `Object`, as for the latter _TS_ will typecheck to ensure we can only use members of `Object` on the value - 
```typescript
let data: any;
data = 23.43;
data = "Some text!";
console.log(data.length);
// data.length is accepted since type is 'any'

let val: Object;
val = "Some other text!";
console.log(val.length);
// comipler will complain as 'Object' does not have 'length' property
```

### Void
`void` is used to indicate that the context has _no type_ at all. Typically used with functions that do not return a value - 
```typescript
function greet(name: string): void{
    console.log(`Hellow ${name}`);
}
```
It is obviously meaningless to declare variables of thios type, as the only values it could have would be `null` and `undefined`.

### Null and Undefined
`null` and `undefined` are really singleton values that variables can have to indicate the absence of a _value_. In _TS_ these two special values have their own types which are called the same. A variable to which nothing has been assigned starts off with `undefined`.
```typescript
let a;
console.log(typeof(a)); // undefined

let b = null;
console.log(typeof(b)); // object
b = 23;
console.log(typeof(b)); // number

let c: null = null;
console.log(typeof(c)); // object
c = 34; // 34 is not assignable to type 'null'
```

### Never
_TS_ uses `never` type to represent functions that _never_ returns, such as those that will always throw an exception or goes into an infinite loop. We cannot assign any value to a varaible of type `never` (except `never` itself). It's purpose is for the type-sysetm to represnet functions that have no return.
```typescript
function fail(): never {
    throw new Error();
}
```

### Object
Any value with _non-primitive_ type will have `object` as its root type.
```typescript
const evens: number[] = [2, 4, 6, 8];

console.log(`type of evens = ${typeof(evens)}`); 
// type of evens = object
// using 'typeof' gives 'object'

console.log(`actual type of evens' = ${evens.constructor.name}`);
// actual type of evens = Array
// use 'constructor' to find detailed type at runtime!
```

## Type Assertions
_Type assertions_ are a way of forcibly specifying the value of a type as something that may be other than what the _transpiler_ infers. It is like _type casting_ in other languages, the difference is that _type assertion_ is only a comiple time feature that instructs the _transpiler_ to treat the value as a specific type. It has no checking or restructuring of data (unlike _boxing_/_unboxing_ in _C#_ for example) -
```typescript
let a: any = 'Hello there';
console.log((<string>a).toUpperCase()); // HELLO THERE
// using '<type>' to assert the type of the variable

let b = 'Hello again';
console.log((b as string).toLowerCase()); // hello again
// using 'as' to assert type  
```
_Type assertion_ syntax can have two forms - prefixing with `<the-type>` or qualify with `as`. Either form is acceptable, though in _JSX_ only `as` assertions are allowed. Since the two forms have no runtime differences (unlike languages such as C# where these two forms have different semantics), it is better to stick to one consitent standard for a project/team.

## Destructuring

Destructuring is a syntactic construct that allows the `expansion` of a _collection or composite_ on the right into _individual varaibles_ on the left in an assignment.

### Array Destructuring

We can use destructing on _Arrays_ as shown:
```typescript
const nums = [100, 200, 300];
const [first, second] = nums ; // array destructuring
console.log(`first = ${first} and second = ${second}`);
```  
Note how the extra values to the right get ignored in the destructuring assignment.  
This is useful for writing functions that take arrays as paramter and we want to access the elements within.  
```typescript
function foo([p1, p2]: Array<number>){
    console.log(`first arg = ${p1} and second arg = ${p2}`);
}
const nums = [10, 20 , 30, 40];
foo(nums);
```  
- **Partial destructuring (...\<remaining>)** -  
If we wish to destructue only part of the array, say the first couple of elements and obtain what is left as another array, we can do that using the `"..."` operator - 
```typescript
const nums = [10, 20 , 30, 40, 50];
const [first, second, ...rest] = nums;
console.log(`first = ${first}, second = ${second}`);
// first = 10, second = 20
console.log(`rest= ${rest}, type of 'rest' = ${rest.constructor.name}`);
// rest= 30,40,50, type of 'rest' = Array
```
Note how the `rest` variable is an `Array` containing the remaining elements.

- **Ignoring elements** -  
Since it is all `JavaScript` we can simply ignore elements we are not interested in -
```typescript
const nums = [10, 20 , 30, 40, 50];
const [, second, , fourth] = nums;
console.log(`second = ${second}, fourth = ${fourth}`);
// second = 20, fourth = 40
```

### Tuple Destructuring

Just like _arrays_ we can destructure _tuples_ -
```typescript
let rec: [number, string, boolean];
rec = [1001, 'Alan', true];

// destructure tuple to individual variables
let [roll_num, name] = rec;
console.log(`${roll_num} - ${name}`); // 1001 - Alan
```  

For _tuples_ too we can access part of the elements individually and the remaining as a subset tuple, using the `...` operator -
```typescript
// destructure partially
let [roll_num, ...rest] = rec;
console.log(`${roll_num} - ${rest}: ${rest.constructor.name}`);
// 1001 - Alan,true: Array
```

We can ignore the fields we do not need -
```typescript
// destructure ignoring some feilds
let [, name, ] = rec;
console.log(`name is '${name}'`);
// name is 'Alan'
```

### Object Destructuring

We can destructure _objects_ in the similar fashion as we do _arrays_ and _tuples_, however the variables on the left should have the same name as the object properties - 
```typescript
let my_obj = {
    id: 1001,
    name: 'Alan',
    active: true,
    score: 78
};

// the following will fail !!!!
let {i, n} = my_obj;
// error : 'i' does not exist on ...

// this will work
let {id, name} = my_obj;
console.log(`id=${id}, name=${name}`);
// id=1001, name=Alan
```

- **Using '`...`' for remaining properties**  
Just like _arrays_ and _tuples_ we can use `...` to partially destructure an object and get the remaining properties as a new object -
```typescript
let {id, name, ...score} = my_obj;
console.log(`Id = ${id}, score = ${score.score}`);
// Id = 1001, score = 78
```

- **Rename Properties while destructuring**  
It is possible to destructure objects to variables with names different from the declared property names, albeit with some 'confusing' syntax -
```typescript
// destructure object with different variable names
let {id: id_num, name: first_name} = my_obj;
// read - 'id' as 'id_num', 'name' as 'first_name'
console.log(`ID = ${id_num}, First Name=${first_name}`);
// ID = 1001, First Name=Alan
```
This syntax is a bit strange and better to be avoided.

- **Default Values while destructuring**  
We can specify _default values_ when destructuring objects -
```typescript
// defualt values when destructuring
let {id, name, active = false, score = 0} = {id: 1002, name: 'Bob'};
// active = false, score = 0
```

## Spread (`...`)

_Spread_ is very similar to _destructuring_ - _spread_ **expands** a collection (_array_, _object_) into another _array_ or _object_ (whereas _destructuring_ expands a collection into _individual_ varaibales).
- **Array spread** -
```typescript
let a = [10, 20, 30, 40];
let b = [1, 2, 3, 4, ...a, 100, 200, 300];
console.log(b);
// [1, 2, 3, 4, 10, 20, 30, 40, 100, 200, 300]
```
The array `a` gets spread into the array `b`.

- **Object spread** -  
We can _spread_ an object into another object in a simialr fashion.
```typescript
const def = {room: "single", smoking: false, nights: 1};
let booking = {...def, nights: 3};
console.log(booking);
// {room: "single", smoking: false, nights: 3}
```
The `def` object gets spread into the `booking` object, and the `nights` property gets overwritten. However, there order of specfying the properties matter when we _spread_ and _object_ -
```typescript
booking = {nights: 3, ...def};
console.log(booking);
// {nights: 1, room: "single", smoking: false}
```
The _spread_ comes later so it overwrites the `nights` poroperty to its value of `1` and the more specific valeu gets lost!  
Another importnat point to remember is that when we _spread_ an object only its **enumerable** properties get copied (i.e. it is a shallow copy of the object). This can lad to confusing behaviour such as -
```typescript
const def =  
{
    room: "single",
    smoking: false,
    nights: 1,
    isAvailable: function(): boolean{
        return false;
    }
};
let booking = {...def, nights: 3};
console.log(booking);
// {room: "single", smoking: false, nights: 3, isAvailable: ƒ}
```
In this case the method `isAvailable` gets copied because it is on the object itself, but the below will not work - 
```typescript
class Res 
{
    room = "single"; 
    smoking = false;
    nights = 1;
    isAvailable(): boolean{
        return false;
    }
};
const def = new Res();
let booking = {...def, nights: 3};
console.log(booking);
// {room: "single", smoking: false, nights: 3}
booking.isAvailable(); // Error - isAvailable() does not exist..
```
This is because when declaring `class Res` the methods get defined on the _prototype_ `Res.prototype`
```typescript
console.log(Res.prototype);
// {constructor: ƒ, isAvailable: ƒ}
```

## Structural Typing and objects
When in comes to type-checking objects _TS_ takes an approach called _structural typing_ where the type is determined by the _'properties the object has'_, rather than the name of the type (a.k.a _nominal typing_). Languages such as _C#_ and _Java_ have nominal typing, so it is useful to look at a few examples to understand how _TS_ type checks objects -
```typescript
// define a variable 'z' with type as an object with 3 properties
let z: {p1: string, p2: boolean, p3: number};

// 'a' is an object literal with same 3 properties
const a = {p1: "a", p2: false, p3: 34};
z = a;
// 'a' can be assigned to 'z'

// 'b' has one more property 'p4'
const b = {p1: "b", p2: true, p3: 23.3, p4: []};
z = b;
// 'b' assigned to 'z', extra property ignored
// this has an excption though!

const c = {a1: "c", a2: true, p3: 23.3};
z = c;
// Error - 'c' does not have 'p1' and 'p2'
// property names have to be same

const d = {p1: "d", p2: true};
z = d;
// Error - 'z' expects a property 'p3'
```  
As long as the value has all the propeties that the type expects the type check will pass.  
When it comes to _extra properties_ it seems they are ignored. However there is a slight nuance to this called _excess property check_ - basically _TS_ does NOT allow _object literals_ with excess properties to be assigned to a type that does not have them, however it will allow an _object variable_ with excess properties to be assigned (this is what we see above with 'b'). We can see it more clearly in the exmple below -
```typescript
let z: {p1: string, p2: boolean, p3: number};

z = {p1: 'b', p2: false, p3: 23, p4: []};
// Error - object literal with extra property 'p4'

const b = {p1: 'b', p2: false, p3: 23, p4: []};
z = b;
// OK - since variable 'b' is assignd to 'z'
```
If we have an _object literal_ with excess properties that we have to assign to a type that does not have them, or pass it as an argument to a function that has a parameter type that does not have those properties we can use _type assertion_ -
```typescript
let z: {p1: string, p2: boolean, p3: number};

z = ({p1: 'b', p2: false, p3: 23, p4: []} as {p1: string, p2: boolean, p3: number});
// Ok - object literal has been morphed to the target type
```
Of course at this point we have to step back and re-look at what we are trying to do. This example here is simply to demostrate the concept. When the _type_ of an object needs to be specified it would typically be a **class** or an **interface**.

**Optional properties** - We can make properties optional by suffixing them with `?`-
```typescript
// object with 'p1', 'p2' and optional 'p3'
let z: {p1: string, p2: boolean, p3?: number};

const d = {p1: "d", p2: true};
z = d;
// 'p3' is optional so this is allowed
```

Another important concept of objects to be familiar with **index signature**. In _JS_ we can access an object's property using either the `.` notation or using `[key]` notation (_JS_ objects are hashmaps under the hood). 
```javascript
let foo = {p1: "Hello", p2: 23};
// '.' access
console.log(foo.p1); // Hello
// index access
console.log(foo['p2']); // 23
```
We can also specify properties on the fly - 
```javascript
let foo = {};
foo.p1 = 'Hello';
// index notation
foo['p2'] = 23;
```
The _index key_ is expected to be `string` or `number` (it has to be something _JS_ can hash). _JS_ does not enforce the type of the index strictly, what it does however is implictly call `toString()` method on the _key_ to get a string value (if _key_ is a _number_ the runtime optimizes and uses the number). We can make this implicit call behaviour visible like so -
```javascript
let foo = {};

const my_key = {
    toString() {
        console.log('called toString()!');
        return 'my_key';
    }
};

foo[my_key] = "Value 1";
// prints - called toString()!
```
_TS_ on the other hand restricts the type of the _index key_ to be a `string`, `number` or `Symbol` -
```typescript
let foo: any = {};

foo['p1'] = 'v1';
// this is ok

foo[0] = 'v2';
// this is ok

foo[false] = 'v3';
// Error - 'false' cannot be used as an index type

const my_key = {};
foo[my_key] = 'v4';
// Error - Type '{}' cannot be used as an index type
```
With **index signature** _TS_ gives us a mechanism to define a dynamic set of properties for an object. We do this using the syntax `[index: string]: type` - 
```typescript
// define the object type
let foo: {
    // using 'index signature'
    [index: string]: string;
}

// initailize foo
foo = {};

// assign property values
foo['a'] = "Alpha";
foo['b'] = 'Beta';
console.log(foo); // {a: "Alpha", b: "Beta"}
console.log(foo.a); // Alpha
```
Note that in the syntax `index` is not a _keyword_, we can use any indentifier there -
```typescript
// define the object type
let foo: {
    // using 'index signature'
    [some_random_text: string]: string;
}
```
Whilst the _value_ can be any type, the _index type_ has to be one of `string`, `number` or `Symbol` (it has to be hashable).
```typescript
// define the object type
let foo: {
    // using 'index signature'
    [index: number]: {month: string};
}

// initailize foo
foo = {};

// assign property values
foo[1] = {month: "Jan"};
console.log(foo[1]); // {month: "Jan"}

foo[2] = {day: "Wed"};
// Error - the type of the value does not match {month: string}
```
One _constraint_ with **index signature** is that if we define an _index signature_ property on an object type(or _class_ or _interface_), any other explict property defined should also have the same type - 
```typescript
// define the object type
let foo: {
    // using 'index signature'
    [index: number]: {month: string};
}

// initailize foo
foo = {};

// assign property values
foo[1] = {month: "Jan"};
console.log(foo[1]); // {month: "Jan"}

foo[2] = {day: "Wed"};
// Error - the type of the value does not match {month: string}
```
**Index signature** is useful for data structures such as an '_options bag'_, and we wnat to define a type (an _interface_ or _class_) for that. We wont know all the properties upfront but we know the type (if we don't we can use `any`).

## Interfaces