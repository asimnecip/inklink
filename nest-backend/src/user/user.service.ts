// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { generateUsername } from 'src/utils/generateUsername';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, walletAddress: string): Promise<User> {
    const user = this.userRepository.create({ username, walletAddress });
    await this.userRepository.save(user);
    return user;
  }
  async checkUserExists(walletAddress: string): Promise<{ 
    exists: boolean, 
    id: number,
    username: string 
    walletAddress: string 
  }> {
    let user = await this.userRepository.findOne({ where: { walletAddress } });

    if (user) {
      // User exists, return their details
      return { 
        exists: true, 
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress 
      };
    } else {
      // User does not exist, generate a random username
      const username = generateUsername();

      // Create and save the new user
      user = this.userRepository.create({ walletAddress, username });
      await this.userRepository.save(user);

      // Return the new user's details
      return { 
        exists: true, 
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress 
      };
    }
  }
}
