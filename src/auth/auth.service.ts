import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { TokenService } from '../token/token.service'
import { SigninUserDto } from '../users/dto/signin-user.dto'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
  ) {
  }

  async signup(CreateUserDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(CreateUserDto.email)
    if (candidate) {
      throw new HttpException(
        `User with email: ${CreateUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 5)
    const user = await this.userService.create({
      ...CreateUserDto,
      password: hashedPassword,
    })

    const tokens = this.tokenService.generateTokens(user)
    await this.tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user
    }
  }

  async signin(SigninUserDto: SigninUserDto) {
    const user = await this.userService.getByEmail(SigninUserDto.email)
    if (!user) {
      throw new HttpException(
        `User with email: ${SigninUserDto.email} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    const passwordMatch = await bcrypt.compare(
      SigninUserDto.password,
      user.password,
    )
    if (!passwordMatch) {
      throw new HttpException('Password is invalid', HttpStatus.UNAUTHORIZED)
    }

    const tokens = this.tokenService.generateTokens(user)
    await this.tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user
    }
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('Token is not provided', HttpStatus.UNAUTHORIZED)
    }

    const userData = await this.tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await this.tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED)
    }

    const user = await this.userService.getById(tokenFromDb.user.id)
    const tokens = this.tokenService.generateTokens(user)
    await this.tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user
    }
  }
}
