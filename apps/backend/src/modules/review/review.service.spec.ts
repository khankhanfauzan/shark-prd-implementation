import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  const reviewRepositoryMock = {
    findFirstProduct: jest.fn(),
    create: jest.fn(),
    findManyByProductId: jest.fn(),
    countByProductId: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: ReviewRepository,
          useValue: reviewRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated reviews', async () => {
    const product = { id: 'product-1' };
    const reviews = [
      {
        id: 'review-1',
        name: 'Alice',
        rating: 5,
        comment: 'Great',
        createdAt: new Date('2026-08-18T10:00:00.000Z'),
      },
    ];

    reviewRepositoryMock.findFirstProduct.mockResolvedValueOnce(product);
    reviewRepositoryMock.findManyByProductId.mockResolvedValueOnce(reviews);
    reviewRepositoryMock.countByProductId.mockResolvedValueOnce(11);

    const result = await service.findAll(10, 5);

    expect(reviewRepositoryMock.findManyByProductId).toHaveBeenCalledWith(
      'product-1',
      10,
      5,
    );
    expect(result).toEqual({
      data: reviews,
      pagination: {
        offset: 10,
        limit: 5,
        currentPage: 3,
        totalItems: 11,
        totalPages: 3,
        hasMore: false,
      },
    });
  });

  it('should throw when product is not found', async () => {
    reviewRepositoryMock.findFirstProduct.mockResolvedValueOnce(null);

    await expect(service.findAll(0, 10)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
