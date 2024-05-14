import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  refreshToken: string

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
}
