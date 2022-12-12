import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly apiKeyService;
  constructor(private readonly configService: ConfigService) {
    this.apiKeyService = configService.get('API_KEY');
  }

  validateApiKey(apiKey: string): boolean {
    return this.apiKeyService === apiKey;
  }
}
