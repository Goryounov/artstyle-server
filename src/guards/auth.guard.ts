import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { KeysService } from '../keys/keys.service'
import { UsersService } from '../users/users.service'
// @ts-ignore
import { accessSecret } from '../config'

const ACCESS_SECRET = accessSecret

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly keysService: KeysService,
    private readonly usersService: UsersService
  ) {
  }

  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest()
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader)
        throw new UnauthorizedException({ message: 'Authorization header not found' })

      const bearer = authorizationHeader.split(' ')[0]
      const token = authorizationHeader.split(' ')[1]
      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'User is unauthorized' })

      const apiKey = await this.keysService.getByKey(token)
      if (apiKey) {
        const user = await this.usersService.getById(apiKey.userId)
        if (user) {
          req.user = user
          return true
        }
      }

      req.user = this.jwtService.verify(token, { secret: ACCESS_SECRET })
      return true
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException({ message: 'User is unauthorized' })
    }
  }
}
