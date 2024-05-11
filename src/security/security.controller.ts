import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { SecurityService } from './security.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { SigninUserDto } from '../users/dto/signin-user.dto'
import { AuthGuard } from '../auth/auth.guard'

@Controller('auth')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @UsePipes(ValidationPipe)
  @Post('/signup')
  async signup(@Body() CreateUserDto: CreateUserDto, @Res() res) {
    const userData = await this.securityService.signup(CreateUserDto)
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    res.json(userData)
  }

  @UsePipes(ValidationPipe)
  @Post('/signin')
  async login(@Body() SigninUserDto: SigninUserDto, @Res() res) {
    const userData = await this.securityService.signin(SigninUserDto)
    // res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    const { accessToken, refreshToken, ...userRest } = userData
    res.json({
      token: accessToken,
      refresh_token: refreshToken,
      ...userRest,
    })
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      throw new HttpException('Logged out', HttpStatus.BAD_REQUEST)
    }

    await this.securityService.logout(refreshToken)
    res.clearCookie('refreshToken')
    res.sendStatus(HttpStatus.OK)
  }

  @Get('/refresh')
  async refresh(@Req() req, @Res() res) {
    const { refreshToken } = req.cookies
    const userData = await this.securityService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    res.json(userData)
  }

  @Get('/user')
  async user(@Req() req, @Res() res) {
    const authorizationHeader = req.headers.authorization
    const token: any = authorizationHeader.split(' ')[1]
    const userData = await this.securityService.refresh(token)
    res.json(userData)
  }
}
