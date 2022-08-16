import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTableMigration1660624358399 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE 'user' (
        'id'	varchar NOT NULL,
        'created_at'	datetime NOT NULL DEFAULT (datetime('now')),
        'updated_at'	datetime NOT NULL DEFAULT (datetime('now')),
        'deleted_at'	datetime,
        'full_name'	varchar NOT NULL,
        'nick_name'	varchar NOT NULL,
        'phone'	varchar NOT NULL,
        'email'	varchar NOT NULL,
        'password'	varchar NOT NULL,
        'push_token'	varchar NOT NULL,
        'picture_id'	varchar NOT NULL,
        PRIMARY KEY('id')
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS 'user';`);
  }

}
