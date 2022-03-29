import { exec } from 'child_process';
import { myConfig } from './config';

export interface Config {
    name: string,
    build: (source: string) => string|null
}

const buildCommand = (source: string): string|null => {
    let built = myConfig
        .map((config) => {return config.build(source)})
        .filter((value) => value != null)[0];
    if (built != null) {
        return built;
    } else {
        return null;
    }
};

const main = () => {
    const args = process.argv.slice(2);
    if (args.length != 1) {
        console.log('usage: openany <source>');
        process.exit(1);
    }
    let source = args[0];
    let command = buildCommand(source);
    if (command == null) {
        return;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
};

main();