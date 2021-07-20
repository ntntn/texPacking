import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs'


let _path = '';
let delta = '';

function compressFolder(path) {
	imagemin([path +'/*.{jpg,png}'], {
		destination: 'build/' + path,
		plugins: [
			imageminPngquant() 
		]
	});	
}

async function compressFolderRecursive(path) {
	console.log('PATH: ', path);
	compressFolder(path)
	let directoriesCount = 0;
	let dir = fs.readdirSync(path);
	dir.forEach(e => {
		try {
			const realPath = fs.realpathSync(e);
			console.log('realPath: ', realPath);
			if (fs.lstatSync(realPath).isDirectory()) {
				console.log(fs.lstatSync(realPath))
				compressFolderRecursive(realPath);
				directoriesCount+=1;
				// _path -= delta;
			};	
		}
		catch(e) {
			console.log(e);
		}
	});
	console.log(directoriesCount);

	if (directoriesCount === 0) {
		_path -= path;
	}
}

const root = 'Assets/';
compressFolderRecursive(root);




