import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecoveryTableMigration1660780424112 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS 'recovery' (
        'id' varchar NOT NULL,
        'created_at' datetime NOT NULL DEFAULT (datetime('now')),
        'updated_at' datetime NOT NULL DEFAULT (datetime('now')),
        'deleted_at' datetime,
        'code' varchar NOT NULL,
        'user_id' varchar,
        CONSTRAINT 'FK_b7c9ead5441526191ad41988576' FOREIGN KEY('user_id') REFERENCES 'user'('id') ON DELETE NO ACTION ON UPDATE NO ACTION,
        PRIMARY KEY('id')
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS 'recovery';`);
  }

}
