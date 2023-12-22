import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:super_secret@localhost:5432/nestjs?schema=public',
        },
      },
    });
  }
}
