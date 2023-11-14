export class CreateKeyTokenDto {
  user_id: string;
  privateKey: string;
  publicKey: string;
  refreshToken: string;
  constructor(data: Partial<CreateKeyTokenDto>) {
    this.user_id = data.user_id;
    this.privateKey = data.privateKey;
    this.publicKey = data.publicKey;
    this.refreshToken = data.refreshToken;
  }
}
