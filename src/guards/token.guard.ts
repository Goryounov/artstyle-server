import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
// @ts-ignore
import { accessSecret } from '../config'

const ACCESS_SECRET = accessSecret

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader)
        throw new UnauthorizedException({ message: 'Authorization header not found' })

      const bearer = authorizationHeader.split(' ')[0]
      const token = authorizationHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'User is unauthorized' })

      req.user = this.jwtService.verify(token, { secret: ACCESS_SECRET })
      return true
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException({ message: 'User is unauthorized' })
    }
  }
}