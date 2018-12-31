TypeScript (TS) Primer
====================
In this article we shall take a quick tour of the fundamental concepts in TS and how to apply them.
## Whats is TS?
TypeScript (TS) is a strict superset of JavaScript (JS) that adds on support for strong typing and advanced langauge features (such as interfaces, generics, decorators and many more). This massivley improves the expressibility of JS and promotes better structured code that is easier to maintain at scale.  The _'tsc'_ compiler transpiles TS down to pure JS (ES5 by default, but can also be made to target ES6) which may be executed either in the browser or in a Node.js runtime.  

## Setup Environment
The first step is to setup a development environment to play with. 
- **Installing TS**  
Th easiest way to install TS is to do it via _NPM_. This means we need to have _Node_ & _NPM_ installed.
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
Because TS ultimately gets reduced to JS, it is possible to use any text editor and JS runtime. However for a productive development experince we shall be using VS Code, which comes with builtin support for TS. We can configure a TS project in VS Code with some minimal configuration. 

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

