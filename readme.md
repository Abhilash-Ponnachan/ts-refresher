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