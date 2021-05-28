import {MigrationInterface, QueryRunner} from "typeorm";

// I could not figure why `npm run migration` didn't work
// ideally we would make a migration to alter tables
export class initBoards1622093877143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" add COLUMN "board_id" serial`);
        await queryRunner.query(`CREATE TABLE "board" ("id" serial PRIMARY KEY, "title" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO board (id, title) VALUES (1, "Trello")`);
        await queryRunner.query(`UPDATE "cards" SET "board_id" = 1 WHERE board_id = NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
