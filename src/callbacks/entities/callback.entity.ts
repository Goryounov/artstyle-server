import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity({ name: 'callbacks' })
export class Callback {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  url: string

  @Column()
  secret: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
}
