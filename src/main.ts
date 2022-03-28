import { exec } from 'child_process';

interface Config {
    name: string,
    builder: (source: string) => (() => string|null)
}

// TODO load from exgernal config file
let sampleConfig: Array<Config> = [
    {
        name: 'sample',
        // redundant
        builder: (source: string) => {
            let pattern = /^tanabe\/\S+$/;
            return () => {
                if (pattern.test(source)) {
                    return `open https://github.com/${source}`;
                } else {
                    return null;
                }
            }
        }
    }
];

const buildCommand = (source: string): string => {
    let built = sampleConfig
        .map((config) => {return config.builder(source)()})
        .filter((value) => value != null)[0];
    if (built != null) {
        return built;
    } else {
        // using open as a default
        return `open ${source}`;
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
    console.log(command);
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