import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1703108295297 implements MigrationInterface {
  name = 'auto1703108295297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "position" character varying(100) NOT NULL, "approved" boolean, "companyId" uuid, CONSTRAINT "UQ_a3d604eaed228ca7366bc7ffe87" UNIQUE ("email"), CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "telegram" character varying(100), "image" character varying(200), "city" character varying(100) NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text, "date" TIMESTAMP NOT NULL DEFAULT now(), "isRead" boolean, "jobRequestId" uuid, "seekerId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seeker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "telegram" character varying(100), "image" character varying(200), "city" character varying(100) NOT NULL, "birthday" date NOT NULL, "gender" character varying(10) NOT NULL, "militaryExperience" boolean, "militaryWork" boolean, CONSTRAINT "UQ_90fe9533a68edaa27a93520821f" UNIQUE ("email"), CONSTRAINT "PK_40c70b62e7b0087bdd3f383ed3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job-request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text, "status" boolean, "seekerId" uuid, "jobOfferId" uuid, "cvId" uuid, CONSTRAINT "PK_e6473719c33a34121c0bf28916b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job-offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "salary" integer NOT NULL, "city" character varying(100) NOT NULL, "description" text NOT NULL, "duties" text NOT NULL, "requirements" text NOT NULL, "conditions" text NOT NULL, "militaryWork" boolean, "postingDate" TIMESTAMP NOT NULL DEFAULT now(), "id_category" uuid, "id_company" uuid, CONSTRAINT "PK_cf411f12f570c8e56e963011ccb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job-category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_cffb6101e09357d7f2df1d9518d" UNIQUE ("name"), CONSTRAINT "PK_83ef2bb343b91488aa4a033b96c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "education" text, "experience" text, "skills" text, "postingDate" TIMESTAMP NOT NULL DEFAULT now(), "cvLink" character varying(200), "id_category" uuid NOT NULL, "id_seeker" uuid NOT NULL, CONSTRAINT "PK_4ddf7891daf83c3506efa503bb8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer" ADD CONSTRAINT "FK_3c1fd852d591f7b15a467b8fc48" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_8ca19f4b5c5f6f5586f7c029c64" FOREIGN KEY ("jobRequestId") REFERENCES "job-request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_a8e3fe8bdf2f013e8b54593a207" FOREIGN KEY ("seekerId") REFERENCES "seeker"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-request" ADD CONSTRAINT "FK_3901941793aaadd2629f2b8db1e" FOREIGN KEY ("seekerId") REFERENCES "seeker"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-request" ADD CONSTRAINT "FK_1e77204cd6660b9ebf8aeb9f135" FOREIGN KEY ("jobOfferId") REFERENCES "job-offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-request" ADD CONSTRAINT "FK_4b6fa56ed62c0b1f7a793527bca" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-offer" ADD CONSTRAINT "FK_6c30434561848b79c5d2f1a392b" FOREIGN KEY ("id_category") REFERENCES "job-category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-offer" ADD CONSTRAINT "FK_948c830f73a5e2e9499dab304a3" FOREIGN KEY ("id_company") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cv" ADD CONSTRAINT "FK_d02e33f2ec0c927e8aa265922e4" FOREIGN KEY ("id_category") REFERENCES "job-category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cv" ADD CONSTRAINT "FK_4195294e44df9c8a77c62bd2746" FOREIGN KEY ("id_seeker") REFERENCES "seeker"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cv" DROP CONSTRAINT "FK_4195294e44df9c8a77c62bd2746"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cv" DROP CONSTRAINT "FK_d02e33f2ec0c927e8aa265922e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-offer" DROP CONSTRAINT "FK_948c830f73a5e2e9499dab304a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-offer" DROP CONSTRAINT "FK_6c30434561848b79c5d2f1a392b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-request" DROP CONSTRAINT "FK_4b6fa56ed62c0b1f7a793527bca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-request" DROP CONSTRAINT "FK_1e77204cd6660b9ebf8aeb9f135"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-request" DROP CONSTRAINT "FK_3901941793aaadd2629f2b8db1e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_a8e3fe8bdf2f013e8b54593a207"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_8ca19f4b5c5f6f5586f7c029c64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer" DROP CONSTRAINT "FK_3c1fd852d591f7b15a467b8fc48"`,
    );
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "cv"`);
    await queryRunner.query(`DROP TABLE "job-category"`);
    await queryRunner.query(`DROP TABLE "job-offer"`);
    await queryRunner.query(`DROP TABLE "job-request"`);
    await queryRunner.query(`DROP TABLE "seeker"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "employer"`);
  }
}
