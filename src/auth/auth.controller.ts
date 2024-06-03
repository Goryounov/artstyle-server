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
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { SigninUserDto } from '../users/dto/signin-user.dto'
import { AuthGuard } from '../guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private securityService: AuthService) {
  }

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
  async signin(@Body() SigninUserDto: SigninUserDto, @Res() res) {
    const userData = await this.securityService.signin(SigninUserDto)

    res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.json(userData)
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

  @Post('/refresh')
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
  @UseGuards(AuthGuard)
  async user(@Req() req, @Res() res) {
    res.json({ user: req.user })
  }
}
