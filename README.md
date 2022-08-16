# create-p5jsBoiler

Initialise an instance of https://github.com/ZKitcher/p5js-Boilerplate

-   Boilerplate to clone for an easy setup to start a P5js project.

-   To create a clone, run `npx create-p5jsboiler` + `app-name`.

```sh
npx create-p5jsboiler app-name
cd app-name
```

It will create a directory called `app-name` inside the current folder.
Inside that directory, it will generate the initial project structure.

```sh
app-name
├── README.md
├── _require.js
├── fileScraper.js
├── index.html
├── package.json
├── style.css
└── src
    ├── classes
        └── demo.js
    └── scripts
        ├── index.js
        └── initialise.js
```

-   Run `npm run build` after creating new script files to create/remake the `_requre.js` file that will import the files from your `src` folder into index.html on load.

-   `setup` and `draw` functions both found in `./src/scripts/index.js`.