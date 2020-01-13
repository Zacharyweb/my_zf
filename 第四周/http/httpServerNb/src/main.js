import program from 'commander';
import Server from './server.js';
program
    .option('-p, --port <val>', 'set http-server port')
    .option('-n, --name <val>', 'set http-server name')
    .parse(process.argv);

let config = {
    port:8080
}

Object.assign(config,program);
let server = new Server(config);
server.start()
