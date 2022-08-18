const packageJson = require('./package.json');
const path = require('path');
const fs = require('fs');
const { buildMainFile } = packageJson;

const requireFile = '_require.js';
const createScript = '.forEach(b=>{var a=document.createElement("script");a.src=b,a.defer=!0,document.head.appendChild(a)})';

let res = [];
let content = [];
const getFiles = dirPath => {
    fs.readdir(dirPath, (err, files) => {
        if (err) return console.log('Unable to scan directory:', err);
        files.forEach(e => {
            if (e.match(/\./)) {
                res.push(path.join(dirPath.replace(__dirname, ''), e).substring(1))
                if (buildMainFile) {
                    fs.readFile(dirPath + '\\' + e, (err, buff) => {
                        if (err) return console.error(err);
                        content.push(buff.toString());
                        fs.writeFileSync('main.js', content.join('\n'));
                    });
                }
            } else {
                getFiles(path.join(dirPath, e))
            }
        });
        fs.writeFileSync(requireFile, JSON.stringify(res) + createScript);
    });
};

getFiles(path.join(__dirname, 'src'));
