/* istanbul ignore file */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SectionsController } from './sections/sections.controller'
import { CardsController } from './cards/cards.controller'
import { CardEntity } from './entities/Card'
import { CardsService } from './cards/cards.service'
import { SectionEntity } from './entities/Section'
import { SectionsService } from './sections/sections.service'
import { BoardsController } from './boards/boards.controller'
import { BoardsService } from './boards/boards.service'
import { BoardEntity } from './entities/Board'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'technical',
      password: 'technical',
      database: 'technical',
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CardEntity, SectionEntity, BoardEntity]),
  ],
  controllers: [AppController, SectionsController, CardsController, BoardsController],
  providers: [AppService, CardsService, SectionsService, BoardsService],
})
export class AppModule {}
