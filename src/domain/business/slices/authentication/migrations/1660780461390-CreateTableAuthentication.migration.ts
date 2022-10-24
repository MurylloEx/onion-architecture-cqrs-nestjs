import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthenticationTableMigration1660780461390 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE 'authentication' (
        'id' varchar NOT NULL,
        'created_at' datetime NOT NULL DEFAULT (datetime('now')),
        'updated_at' datetime NOT NULL DEFAULT (datetime('now')),
        'deleted_at' datetime,
        'ip_address' varchar NOT NULL,
        'jwt' varchar NOT NULL,
        PRIMARY KEY('id')
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS 'authentication';`);
  }

}
