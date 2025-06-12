import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { LoggerService } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockLoggerService = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
        { provide: LoggerService, useValue: mockLoggerService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('should throw ConflictException if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({ email: 'user@example.com' });

      await expect(
        authService.signUp({ name: 'John Doe', email: 'user@example.com', password: 'Password123!' }),
      ).rejects.toThrow('User already exists with this email');
    });

    it('should create a new user and return a JWT token', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue({
        _id: '123',
        email: 'user@example.com',
        name: 'John Doe',
      });
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await authService.signUp({
        name: 'John Doe',
        email: 'user@example.com',
        password: 'Password123!',
      });

      expect(result).toEqual({
        statusCode: 201,
        message: 'User registered successfully',
        data: {
          user: { email: 'user@example.com', name: 'John Doe' },
          accessToken: 'mockToken',
        },
      });
    });
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException if user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(
        authService.signIn({ email: 'user@example.com', password: 'Password123!' }),
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      mockUserModel.findOne.mockResolvedValue({
        email: 'user@example.com',
        password: await bcrypt.hash('Password123!', 10),
      });

      await expect(
        authService.signIn({ email: 'user@example.com', password: 'WrongPassword!' }),
      ).rejects.toThrow('Invalid email or password');
    });

    it('should return a JWT token if credentials are valid', async () => {
      mockUserModel.findOne.mockResolvedValue({
        _id: '123',
        email: 'user@example.com',
        password: await bcrypt.hash('Password123!', 10),
        name: 'John Doe',
      });
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await authService.signIn({
        email: 'user@example.com',
        password: 'Password123!',
      });

      expect(result).toEqual({
        statusCode: 200,
        message: 'User signed in successfully',
        data: {
          user: { email: 'user@example.com', name: 'John Doe' },
          accessToken: 'mockToken',
        },
      });
    });
  });
});