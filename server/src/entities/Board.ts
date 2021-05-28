import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CardEntity } from './Card'

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => CardEntity, (card) => card.section)
  @JoinColumn({ referencedColumnName: 'board_id' })
  cards: CardEntity[]
}
