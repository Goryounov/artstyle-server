import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: '*:*' })
export class SocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private logger: Logger = new Logger('Sockets')

  afterInit(server: Server) {
    this.logger.log('Init socket connection')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  sendMessage(event: string, payload: any): void {
    this.logger.log(`Sending message ${JSON.stringify(payload)}`)
    this.server.emit(event, payload)
  }
}
