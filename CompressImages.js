import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs'
import path from "path"

const root = ''

function compressFolder(path)
{
	imagemin([ path + '/*.{jpg,png}' ], {
		destination: 'build/' + path,
		plugins: [
			imageminPngquant()
		],
	});
}

function getAllFiles(dirPath, arrayOfFiles)
{
	const files = fs.readdirSync(dirPath)

	arrayOfFiles = arrayOfFiles || []

	files.forEach(function (file)
	{
		if (fs.statSync(dirPath + "/" + file).isDirectory())
		{
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
		} else
		{
			arrayOfFiles.push(path.join(root, dirPath, "/", file))
		}
	})

	return arrayOfFiles
}

function getAllDirectories(dirPath, directories)
{
	const files = fs.readdirSync(dirPath)

	directories = directories || []

	files.forEach(function (file)
	{
		if (fs.statSync(dirPath + "/" + file).isDirectory())
		{
			directories.push(path.join(root, dirPath, "/", file))
			directories = getAllDirectories(dirPath + "/" + file, directories)
		}
	})

	return directories
}

const directories = getAllDirectories('Assets');
console.log('directories: ', directories);
directories.forEach(e => {
	const folderPath = e.replace(/\\/g, "/");
	console.log('COMPRESS FOLDER: ', folderPath);
	compressFolder(folderPath);
})