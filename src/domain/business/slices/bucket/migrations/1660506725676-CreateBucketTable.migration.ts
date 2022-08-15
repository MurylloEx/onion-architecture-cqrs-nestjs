import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBucketTableMigration1660506725676 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "bucket" (
        "id" varchar PRIMARY KEY NOT NULL, 
        "created_at" datetime NOT NULL DEFAULT (datetime('now')), 
        "updated_at" datetime NOT NULL DEFAULT (datetime('now')), 
        "deleted_at" datetime, 
        "type" varchar NOT NULL, 
        "action_type" varchar NOT NULL, 
        "reference_id" varchar NOT NULL, 
        "extra_info" varchar NOT NULL
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "bucket";`);
  }

}
