import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { SectionEntity } from './Section'
import { BoardEntity } from './Board'

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ name: 'section_id' })
  section_id: number

  @Column({ name: 'board_id' })
  board_id: number

  @ManyToOne(() => SectionEntity, (section) => section.cards)
  @JoinColumn({ name: 'section_id' })
  section: SectionEntity

  @ManyToOne(() => BoardEntity, (board) => board.cards)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity
}
