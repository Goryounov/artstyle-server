import { MigrationInterface, QueryRunner } from 'typeorm'

export class Classes1717577363195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder()
      .insert()
      .into('classes')
      .values([
        { classId: 0, name: 'Northern Renaissance' },
        { classId: 1, name: 'Impressionism' },
        { classId: 2, name: 'Baroque' },
        { classId: 3, name: 'Symbolism' },
        { classId: 4, name: 'Expressionism' },
        { classId: 5, name: 'Naive Art Primitivism' },
        { classId: 6, name: 'Romanticism' },
        { classId: 7, name: 'Art Nouveau Modern' },
        { classId: 8, name: 'High Renaissance' },
        { classId: 9, name: 'Post Impressionism' },
        { classId: 10, name: 'Minimalism' },
        { classId: 11, name: 'Abstract Expressionism' },
        { classId: 12, name: 'Mannerism Late Renaissance' },
        { classId: 13, name: 'Realism' },
        { classId: 14, name: 'Ukiyo e' },
        { classId: 15, name: 'Pop Art' },
        { classId: 16, name: 'Fauvism' },
        { classId: 17, name: 'Early Renaissance' },
        { classId: 18, name: 'Color Field Painting' },
        { classId: 19, name: 'Rococo' },
        { classId: 20, name: 'Pointillism' },
        { classId: 21, name: 'Synthetic Cubism' },
        { classId: 22, name: 'Cubism' },
        { classId: 23, name: 'New Realism' },
        { classId: 24, name: 'Action painting' },
        { classId: 25, name: 'Contemporary Realism' },
        { classId: 26, name: 'Analytical Cubism' }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder()
      .delete()
      .from('classes')
      .execute();
  }
}