import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from '../users/entities/user.entity'

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryColumn()
  public userId: number

  @Column()
  refreshToken: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
