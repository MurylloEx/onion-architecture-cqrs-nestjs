import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoggingTableMigration1660625313012 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE 'logging' (
        'id'	varchar NOT NULL,
        'created_at'	datetime NOT NULL DEFAULT (datetime('now')),
        'updated_at'	datetime NOT NULL DEFAULT (datetime('now')),
        'deleted_at'	datetime,
        'service_name'	varchar NOT NULL,
        'message'	varchar NOT NULL,
        'description'	varchar NOT NULL,
        'object'	varchar NOT NULL,
        'error'	varchar NOT NULL,
        'type'	varchar NOT NULL,
        PRIMARY KEY('id')
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS 'logging';`);
  }

}
