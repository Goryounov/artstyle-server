import {
  CanActivate,
  ExecutionContext, HttpException, HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { accessSecret } from '../../config.js'

const ACCESS_SECRET = accessSecret

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    try {
      const authorizationHeader = request.headers.authorization
      if (!authorizationHeader)
        throw new UnauthorizedException({ message: 'Authorization header not found' })

      const bearer = authorizationHeader.split(' ')[0]
      const token = authorizationHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'User is unauthorized' })


      request.user = this.jwtService.verify(token, { secret: ACCESS_SECRET })
      return true
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException({ message: 'User is unauthorized' })
    }
  }
}
