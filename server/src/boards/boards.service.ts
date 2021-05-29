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

  async createBoard({ title }: {title: string }): Promise<BoardEntity> {
    const titleExists = await this.boardsRepository.find({ title: title})
    if (titleExists.length == 0) {
      let board = new BoardEntity()
      board.title = title
      return this.boardsRepository.save(board)
    }
    else {
      throw new Error("Board name already exists: " + title)
    }
  }
}
