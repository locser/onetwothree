export class CreateApiKeyDto {
  key: string;
  status: number;
  permissions: string;

  constructor(data: any) {
    this.key = data?.key || '';
    this.status = data?.status || 0;
    this.permissions = data?.permissions || 'MEMBER';
  }
}
