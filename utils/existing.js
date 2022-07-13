const { exit } = require('process');
const { readdirSync, mkdirSync } = require('fs');
const { Select } = require('enquirer');
const path = require('path');
const { yellow: y, dim: d } = require('chalk');

const getDirectories = source =>
	readdirSync(source, { withFileTypes: true }).filter(dirent =>
		dirent.isDirectory()
	);

module.exports = async function (selectedDirPath) {
	const { execa } = await import('execa');

	const dirs = getDirectories(selectedDirPath);

	const selectedProject = await new Select({
		name: 'projectDir',
		message: 'Select a directory',
		choices: dirs
	}).run();

	const projectDir = path.join(selectedDirPath, selectedProject);

	console.log(`Starting ${y(selectedProject)}`);

	process.chdir(projectDir);

	await execa('code .');
	await execa('start chrome');

	exit();
};
