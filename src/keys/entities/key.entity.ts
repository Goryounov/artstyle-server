import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity({ name: 'keys' })
export class Key {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  name: string

  @Column()
  key: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
}
