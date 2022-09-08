import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConfirmationForeignKeyToUserTable1660780764696 implements MigrationInterface {
  // https://stackoverflow.com/questions/1884787/how-do-i-drop-a-constraint-from-a-sqlite-3-6-21-table
  async up(queryRunner: QueryRunner): Promise<void> {
    // https://stackoverflow.com/questions/17645609/add-new-column-with-foreign-key-constraint-in-one-command
    queryRunner.query(`
      ALTER TABLE 'user' 
        ADD COLUMN 'confirmation_id' varchar,
        ADD CONSTRAINT 'FK_6d0847bd8c1ad0cfb1a95319add' FOREIGN KEY('confirmation_id') REFERENCES 'confirmation'('id') ON DELETE NO ACTION ON UPDATE NO ACTION,
        ADD CONSTRAINT 'REL_6d0847bd8c1ad0cfb1a95319ad' UNIQUE('confirmation_id'),
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    //TODO
    queryRunner.query(``);
  }
  
}
