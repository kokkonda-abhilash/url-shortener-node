import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { IUrl } from 'app/modelInterfaces/model.url';
import { UrlManagementService } from 'app/services/manage.url';
import { Request, Response } from 'express';

@Controller('api/url')
export class UrlController {

    private _service: UrlManagementService;

    constructor(readonly service: UrlManagementService) {
        this._service = service;
    }

    @Post(':longUrl')
    public async generateShortUrl(request: Request, response: Response) {
        Logger.Info('Request parameters');
        Logger.Info(request.params.longUrl);
        try {
            Logger.Imp('UrlController: generateShortUrl: Try: START')
            const url: IUrl = await this._service.shortenUrl(request.params.longUrl);
            Logger.Imp(url.toJSON);
            response.status(200).json(url);
        } catch (err) {
            Logger.Err('Error createing a short url');
            Logger.Err(err.message);
            throw err;
        }
    }

    @Get(':shortUrl')
    public async getLongUrl(request: Request, response: Response) {
        try {
            const actualUrl = await this._service.getActualUrl(request.params.shortUrl);
            response.status(200).json({
                url: actualUrl
            });
        } catch (err) {
            Logger.Err('Error createing a short url');
            Logger.Err(err.message);
            throw err;
        }
    }
}