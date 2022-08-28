import chalk from 'chalk';
import app from './src/app';

(async (): Promise<void> => {
    try {
        await app.start();
    } catch (error) {
        console.log(chalk.red('Stopping server...'));
    }
})();


