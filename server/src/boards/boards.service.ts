import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardEntity } from '../entities/Board'
import { Repository } from 'typeorm'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  findAllBoards(): Promise<BoardEntity[]> {
    return this.boardsRepository.find()
  }

  createBoard({ title }: {title: string }): Promise<BoardEntity> {
    const titleExists = this.boardsRepository.find({ title: title})
    if (titleExists) {
      throw new Error("Board name already exists: " + title)
    }
    else {
      let board = new BoardEntity()
      board.title = title
      return this.boardsRepository.save(board)
    }
  }
}
