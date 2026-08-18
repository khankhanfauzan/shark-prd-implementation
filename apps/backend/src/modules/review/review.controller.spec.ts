import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let controller: ReviewController;
  const reviewServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: reviewServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should pass parsed pagination params to service', async () => {
    reviewServiceMock.findAll.mockResolvedValueOnce({ data: [], pagination: {} });

    await controller.findAll('20', '10');

    expect(reviewServiceMock.findAll).toHaveBeenCalledWith(20, 10);
  });
});
