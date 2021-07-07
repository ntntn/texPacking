// import texturePacker from 'free-tex-packer-core'
const texturePacker = require('free-tex-packer-core');
let fs = require("fs");



let images = [];

// images.push({path: "img1.png", contents: fs.readFileSync("./img1.png")});
// images.push({path: "img2.png", contents: fs.readFileSync("./img2.png")});
// images.push({path: "img3.png", contents: fs.readFileSync("./img3.png")});

const options = { 
    textureName: 'texture',
    width: undefined,
    height: undefined,
    fixedSize: undefined,
    powerOfTwo: undefined,
    padding: undefined,
    extrude: undefined,
    allowRotation: undefined,
    detectIdentical: undefined,
    allowTrim: true,
    trimMode: undefined,
    alphaThreshold: undefined,
    removeFileExtension: undefined,
    prependFolderName: undefined,
    textureFormat: undefined,
    base64Export: undefined,
    scale: undefined,
    scaleMethod: undefined,
    tinify: undefined,
    tinifyKey: undefined,
    packer: undefined,
    packerMethod: undefined,
    exporter: undefined,
    filter: undefined,
    appInfo: undefined,
 }

const dir = './Attack10';
fs.readdir(dir, (err, files) => {
    files.forEach(file => {
        console.log(JSON.stringify(file));
        images.push({path: file, contents: fs.readFileSync(dir + '/' + file) });
    }),
    texturePacker(images, {
        textureName: 'texture',
        allowRotation: false,
        packer: 'OptimalPacker',
        exporter: 'Phaser3',
        removeFileExtension: true,
    }, (files, error) => {
        if (error) {
            console.error('Packaging failed', error);
        } else {  
            for(let item of files) {
                fs.writeFileSync(dir +'/' + item.name, item.buffer);
                console.log(item.name, item.buffer);
            }
        }
        
    });
});



