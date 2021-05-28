import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { BoardEntity } from '../entities/Board'
import { BoardsService } from './boards.service'

@Controller('boards')
export class BoardsController {
  private readonly logger = new Logger(BoardsController.name)

  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(@Param() params ): Promise<BoardEntity[]> {
    this.logger.log('GET /getAllBoards')

    return this.boardsService.findAllBoards()
  }

  @Post()
  createBoard(@Body() board: { title: string }): Promise<BoardEntity> {
    this.logger.log('POST /createBoard')
    return this.boardsService.createBoard(board)
  }
}
