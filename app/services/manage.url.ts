import { IUrl } from "../modelInterfaces/model.url";

export interface UrlManagementService {
    shortenUrl(longUrl: string): Promise<IUrl>;
    getActualUrl(shortUrl: string): Promise<string>;
}