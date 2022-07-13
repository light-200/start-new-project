#!/usr/bin/env node

/**
 * start-new-project
 * automates the tedious process of creating a new project
 *
 * @author light <https://github.com/light-200>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const projects = require('./utils/projects');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	projects(flags.existing);
	debug && log(flags);
})();
