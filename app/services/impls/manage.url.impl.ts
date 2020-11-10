import Url, { IUrl } from "../../modelInterfaces/model.url";
import { UrlManagementService } from "../manage.url";
import { Logger } from '@overnightjs/logger'

export class UrlManagementServiceImpl implements UrlManagementService {

    public async getActualUrl(short: string): Promise<string> {
        Logger.Imp('UrlManagementServiceImpl: getActualUrl: START');
        try {
            Logger.Imp('UrlManagementServiceImpl: getActualUrl: TRY');
            const urlRecord = await Url.findOne({ short }).exec();
            Logger.Imp(urlRecord?.toString());
            if (urlRecord && urlRecord.url) return urlRecord.url;
            return '';
        } catch (error) {
            Logger.Imp('UrlManagementServiceImpl: getActualUrl: CATCH');
            console.log('Error occured while contacing the database');
            console.log(error.message);
            throw error;
        }
    }

    public async shortenUrl(url: string): Promise<IUrl> {
        Logger.Imp('UrlManagementServiceImpl: shortenUrl: START');
        try {
            Logger.Imp('UrlManagementServiceImpl: shortenUrl: TRY');
            const urlRecord = await Url.findOne({ url: url }).exec();
            if (urlRecord) return urlRecord;
            return await Url.create({url});
        } catch (error) {
            Logger.Err('UrlManagementServiceImpl: shortenUrl: TRY');
            console.log('Error occured while contacing the database');
            console.log(error.message);
            throw error;
        }
    }
}