import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'classes' })
export class Class {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  classId: number

  @Column()
  name: string

  @Column()
  description: string
}