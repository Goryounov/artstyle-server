import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import { KeysService } from '../keys/keys.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(
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
      if (!apiKey)
        throw new UnauthorizedException({ message: 'User is unauthorized' })

      req.user = await this.usersService.getById(apiKey.userId)
      return true
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException({ message: 'User is unauthorized' })
    }
  }
}