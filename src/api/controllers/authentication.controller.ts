import { Request } from 'express';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import {
  AuthenticationService,
  ConfirmationService,
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

  @Get('/confirm/:confirmationCode')
  confirmAccount(@Param('confirmationCode') confirmationCode: string) {
    return this.confirmationService.confirmAccount(confirmationCode);
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
