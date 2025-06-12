import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp and return the result', async () => {
      const mockResult = {
        statusCode: 201,
        message: 'User registered successfully',
        data: {
          user: { email: 'user@example.com', name: 'John Doe' },
          accessToken: 'mockToken',
        },
      };
      mockAuthService.signUp.mockResolvedValue(mockResult);

      const result = await authController.signUp({
        name: 'John Doe',
        email: 'user@example.com',
        password: 'Password123!',
      });

      expect(result).toEqual(mockResult);
      expect(mockAuthService.signUp).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'user@example.com',
        password: 'Password123!',
      });
    });
  });

  describe('signIn', () => {
    it('should call AuthService.signIn and return the result', async () => {
      const mockResult = {
        statusCode: 200,
        message: 'User signed in successfully',
        data: {
          user: { email: 'user@example.com', name: 'John Doe' },
          accessToken: 'mockToken',
        },
      };
      mockAuthService.signIn.mockResolvedValue(mockResult);

      const result = await authController.signIn({
        email: 'user@example.com',
        password: 'Password123!',
      });

      expect(result).toEqual(mockResult);
      expect(mockAuthService.signIn).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Password123!',
      });
    });
  });
});