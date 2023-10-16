import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('public')
export class AppController {
  @Get('health-check')
  healthCheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Success',
      data: null,
    });
  }
}
