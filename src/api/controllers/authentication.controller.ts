import { Request, Response } from 'express';
import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import {
  AuthenticationService,
  ConfirmationService,
  IgnoreAppVersion,
  IgnoreResponseDefault,
  RecoveryDto,
  RecoveryService,
  UserSignInDto,
  UserSignUpDto
} from 'src/common';

@Controller('/authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly confirmationService: ConfirmationService,
    private readonly recoveryService: RecoveryService
  ) { }

  @Post('/signup')
  registerUser(@Body() user: UserSignUpDto) {
    return this.authenticationService.registerUser(user);
  }

  @Post('/signin') 
  authenticateUser(@Req() request: Request, @Body() credentials: UserSignInDto) {
    return this.authenticationService.authenticateUser(credentials, request.ip);
  }

  @IgnoreAppVersion()
  @IgnoreResponseDefault()
  @Get('/confirm/:confirmationCode')
  async confirmAccount(
    @Param('confirmationCode') confirmationCode: string, 
    @Res() response: Response
  ) {
    const confirmation = await this.confirmationService.confirmAccount(confirmationCode);
    response.render('confirmation', { confirmation });
  }

  @Post('/recovery/request/:userEmail')
  requestRecoveryCode(@Param('userEmail') userEmail: string) {
    return this.recoveryService.requestRecoveryCode(userEmail);
  }

  @Get('/recovery/check/:recoveryCode')
  checkRecoveryCode(@Param('recoveryCode') recoveryCode: string) {
    return this.recoveryService.checkRecoveryCode(recoveryCode);
  }

  @Put('/recovery/change/:recoveryCode')
  changePassword(
    @Param('recoveryCode') recoveryCode: string,
    @Body() recovery: RecoveryDto
  ) {
    return this.recoveryService.changePassword(recoveryCode, recovery);
  }

}
