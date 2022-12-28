const packageJson = require('./package.json');
const path = require('path');
const fs = require('fs');
const { buildMainFile } = packageJson;
const requireFile = '_require.js';
const createScript = '.reverse().forEach(b=>{let a=document.createElement("script");a.src=b,a.defer=!0,document.head.appendChild(a)})';

const getFiles = (dir, done) => {
    let results = [];
    let content = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results, content);
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    getFiles(file, function (err, res, con) {
                        results = results.concat(res);
                        content = content.concat(con);
                        next();
                    });
                } else {
                    fs.readFile(file, (err, buff) => {
                        if (err) return console.error(err);
                        const buffer = buff.toString();
                        const path = file.replace(__dirname, '').substring(1);
                        if (buffer.match('extends')) {
                            content.unshift(buffer);
                            results.unshift(path);
                        } else {
                            content.push(buffer);
                            results.push(path);
                        }
                        next();
                    })
                }
            });
        })();
    });
};

getFiles(path.join(__dirname, 'src'), (err, results, content) => {
    if (err) throw err;
    fs.writeFileSync(requireFile, JSON.stringify(results) + createScript);
    if (buildMainFile) {
        fs.writeFileSync('main.js', content.join('\n'));
    }
});
