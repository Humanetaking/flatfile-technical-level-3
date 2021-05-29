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

  async findAll(boardId: number): Promise<SectionEntity[]> {

    // I spent an hour on trying to figure typeorm's innerjoin and decided to make another call to db and merge it
    let sections = await this.sectionsRepository.find();

        
    let sectionsWithCards = await this.sectionsRepository.find(
      {
        relations: ['cards'],
        where: condition => {
          condition.where('SectionEntity__cards.board_id = :boardId', { boardId: boardId });
        }
      }
    )
    
    sections.forEach(section => {
      section["cards"] = []
      sectionsWithCards.forEach(sectionWithCards => {
        if (sectionWithCards.id == section.id) {
          section["cards"] = sectionWithCards.cards
        }
      })
    });

    return sections
  }
}
