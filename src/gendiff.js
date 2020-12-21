import { program } from 'commander';

const runGenDiff = (argv) => {
    program.description('Compares two configuration files and shows a difference.');
    program.version('0.0.1');
    program.parse(argv);
}

export default runGenDiff;
