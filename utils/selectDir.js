const { Select } = require('enquirer');

module.exports = async function () {
	const dirs = {
		Exp: 'D:\\Documents\\Coding\\Exp',
		Personal: 'D:\\Documents\\Coding\\Personal',
		OpenSource: 'D:\\Documents\\Coding\\OpenSource'
	};

	const selectedDir = await new Select({
		name: 'projectDir',
		message: 'Select a directory',
		choices: Object.keys(dirs)
	}).run();

	return { selectedDir, path: dirs[selectedDir] };
};
