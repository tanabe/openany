import { exec } from 'child_process';
const args = process.argv.slice(2);

if (args.length != 1) {
    console.log('usage: anyopen <source>');
    process.exit(1);
}

let source = args[0];
let command = `open ${source}`;
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