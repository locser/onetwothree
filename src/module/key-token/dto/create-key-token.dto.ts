export class CreateKeyTokenDto {
  user: string;
  // privateKey: string;
  // publicKey: string;
  refreshToken: string;
  constructor(data: Partial<CreateKeyTokenDto>) {
    this.user = data.user;
    // this.privateKey = data.privateKey;
    // this.publicKey = data.publicKey;
    this.refreshToken = data.refreshToken;
  }
}
