import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatePostsCategories1598907503696
  implements MigrationInterface {
  name = 'CreatePostsCategories1598907503696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_id" uuid NULL, "category_id" uuid NULL, CONSTRAINT "PK_5d3b2df4bf38bca8b037cb19068" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories" ADD CONSTRAINT "FK_7aa2cc32acbe04ab0e196977a56" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories" ADD CONSTRAINT "FK_5f604036872bdb8981d298fe3ce" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts_categories" DROP CONSTRAINT "FK_5f604036872bdb8981d298fe3ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories" DROP CONSTRAINT "FK_7aa2cc32acbe04ab0e196977a56"`,
    );
    await queryRunner.query(`DROP TABLE "posts_categories"`);
  }
}
