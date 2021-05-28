import { Test, TestingModule } from '@nestjs/testing'
import { BoardEntity } from '../entities/Board'
import { Repository } from 'typeorm'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'
import { getRepositoryToken } from '@nestjs/typeorm'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

// Grabbed this from geeksforgeeks to convert string into an id for test scenario
function stringToHash(string) {                
  var hash = 0;
  if (string.length == 0) return hash;
  for (var i = 0; i < string.length; i++) {
      var char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
  return hash;
}

var existingBoard = {
  id: stringToHash("Concierge"),
  title: "Concierge"
}


export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  find: jest.fn((entity) => (
    (entity.title == "Concierge") ? existingBoard : null)
  ),
  save: jest.fn((entity) => ({
    id: stringToHash(entity.title),
    ...entity
  })),
}))

describe('BoardController', () => {
  let controller: BoardsController
  let service: BoardsService
  let repositoryMock: MockType<Repository<BoardEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(BoardEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<BoardsController>(BoardsController)
    service = module.get<BoardsService>(BoardsService)
    repositoryMock = module.get(getRepositoryToken(BoardEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should be create a board', async () => {
    let createBoardInput = {title: "Trello"}
    let trelloBoard = controller.createBoard(createBoardInput)
    expect((await trelloBoard).id).toBe(stringToHash(createBoardInput.title))
    expect((await trelloBoard).title).toBe(createBoardInput.title)
  })

  it('should not create a board and throw error', async () => {
    expect(() => controller.createBoard({title: existingBoard.title})).toThrowError()
  })
})
