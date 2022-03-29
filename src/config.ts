import { Config } from './main';

export const myConfig: Array<Config> = [
    {
        name: 'github',
        build: (source: string) => {
            let pattern = /^\S+\/\S+$/;
            if (pattern.test(source)) {
                return `open https://github.com/${source}`;
            } else {
                return null;
            }
        }
    }
];