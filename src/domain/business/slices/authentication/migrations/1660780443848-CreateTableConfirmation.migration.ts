import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConfirmationTableMigration1660780443848 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS 'confirmation' (
        'id' varchar NOT NULL,
        'created_at' datetime NOT NULL DEFAULT (datetime('now')),
        'updated_at' datetime NOT NULL DEFAULT (datetime('now')),
        'deleted_at' datetime,
        'code' varchar NOT NULL
        PRIMARY KEY('id')
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS 'confirmation';`);
  }

}
