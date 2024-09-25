import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
describe('14234 (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService
  beforeEach(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();

    prismaService = app.get(PrismaService)
    await prismaService.cleanDatabase()
  });
  afterAll(async () => {
    app.close()
  })
  it.todo("hihi!");
  it.todo("hihi!");
});
