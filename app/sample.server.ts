import * as bodyParser from 'body-parser'

import { Server } from '@overnightjs/core'
import { UrlController } from './controllers/url.shorten.controller';
import { UrlManagementServiceImpl } from './services/impls/manage.url.impl';
import connecToDb from './db/mongodb.connection';

export class SampleServer extends Server {
    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        connecToDb();
        const urlController: UrlController = new UrlController(new UrlManagementServiceImpl());
        super.addControllers([urlController]);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log('Server started listening on port: ' + port);
        });
    }
}