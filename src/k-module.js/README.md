# k-module.js

A code base for any typescript project that includes

- ui components
- css in js
- math

## Usage

- put this repository in the `src` of the parent project
- remember to delete `k-module.js/node_modules` when referencing k-module.js from the parent project

## Dev

### Prerequisite

Install [Bun](https://bun.sh/)

> you can uninstall existing Node.js, npm, Typescript, tsc 

### Install dependencies

```bash
# from package.json
bun i

# add an external module
bun i solidjs

# remove an external module
bun rm solidjs
```

### Test

see `color.test.ts` as a sample 

```bash
bun test color

# DOM
bun testdom SomeComponent

# all
bun testdom

# coverage
bun testcov
```

#### Debug (Test)

1. Install `Bun for Visual Studio Code`

2. Add the following configuration

.vscode/launch.json

```
{
    "version": "0.2.0",
    "configurations": [
    // code WITHOUT DOM
        {
            "type": "bun",
            "request": "launch",
            "name": "Debug Bun",
            "program": "${file}",
            "args": [],
            "cwd": "${workspaceFolder}",
            "env": {},
            "strictEnv": false,
            "watchMode": false,
            "stopOnEntry": false,
            "noDebug": false,
            "runtime": "bun",
            "runtimeArgs": [],
        },
    // code WITH DOM (it takes about 150 ms for preloading DOM)
        {
            "type": "bun",
            "request": "launch",
            "name": "Debug Bun DOM",
            "program": "${file}",
            "args": ["--preload", "./test.preload.ts"],
            "cwd": "${workspaceFolder}",
            "env": {},
            "strictEnv": false,
            "watchMode": false,
            "stopOnEntry": false,
            "noDebug": false,
            "runtime": "bun",
            "runtimeArgs": [],
        },
    ]
}
```

3. Select either of configurations, open any test file, and press F5 to launch a debugger

### Design

write components and render them into App.tsx to visualize in browser 

run 
```
bun dev
```
open http://locolhost:1420

or in VS-Code, ctrl+shfit+p "Debug: Select & Launch" -> "Launch Brave" (requires brave browser)

#### WSL
hot reload does not work by default for WSL.

you need 
- set `$BROWSER` to `/usr/bin/browser`
- create a symlink `ln -s /c/mnt/Program\ Files/path-to-your-browser /usr/bin/browser`

> simply setting `$BROWSER` to `/c/mnt/Program\ Files/path-to-your-browser` without symlink does not work as linux cannot handle white spaces in paths in this case

