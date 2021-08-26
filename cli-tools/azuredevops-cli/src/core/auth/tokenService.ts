import { ConfigProvider } from '../../configs/configProvider.ts';

export class TokenService {
  private _configProvider: ConfigProvider;

  constructor(configProvider: ConfigProvider) {
    this._configProvider = configProvider;
  }

  getFor(userId: string): string {
    const foundPat = this._configProvider.getUserPat(userId);

    if (!foundPat) {
      throw new Error('PAT not found');
    }

    return foundPat;
  }
}
