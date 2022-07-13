const { Input } = require('enquirer');
const fs = require('fs');
const os = require('os');
const path = require('path');
const process = require('process');
const { yellow: y, dim: d } = require('chalk');
const existing = require('./existing');
const selectDir = require('./selectDir');

const question = {
	type: 'input',
	name: 'projectName',
	message: 'Project name'
};

module.exports = async function (existingProject) {
	const { execa } = await import('execa');

	const { selectedDir, path: selectedDirPath } = await selectDir();

	if (existingProject) await existing(selectedDirPath);

	const response = await new Input({
		...question,
		validate: value => {
			const dirExists = fs.existsSync(
				path.resolve(selectedDirPath, value)
			);
			if (dirExists && value) {
				return 'Directory already exists!';
			}
			return !value ? 'Please add a value!' : true;
		}
	}).run();

	const projectDir = path.resolve(selectedDirPath, response);

	fs.mkdirSync(projectDir);

	console.log(`Created ${y(response)} directory in ${y(selectedDir)}`);

	process.chdir(projectDir);

	await execa('code .');
	await execa('start chrome');
};
