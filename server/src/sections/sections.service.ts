import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SectionEntity } from '../entities/Section'
import { Repository } from 'typeorm'

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SectionEntity)
    private sectionsRepository: Repository<SectionEntity>
  ) {}

  findAll(boardId: number): Promise<SectionEntity[]> {
    return this.sectionsRepository.find(
      {
        relations: ['cards'],
        where: condition =>{
          condition.where('SectionEntity__cards.board_id = :boardId', { boardId: boardId})
        }
      }
    )
  }
}
