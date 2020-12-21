import { program } from 'commander';

const runGenDiff = (argv) => {
  program.description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .parse(argv);
};

export default runGenDiff;
