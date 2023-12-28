import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Seeker } from '../seeker/seeker.entity';
import { AuthDto } from './auth.dto';
import { Admin } from '../admin/admin.entity';
import { Employer } from '../employer/employer.entity';
import { getRepository } from 'typeorm';
import { Response } from 'express';
import { json } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (email, role) => {
  const payload = {
    email,
    role,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

@Controller()
export class AuthController {
  @Post('registration')
  async registration(@Body() authDto: AuthDto, @Res() res: Response) {
    try {
      if (await findUserByEmail(authDto)) {
        return res.status(400).send('user with this email already exist');
      }
      authDto.password = bcrypt.hashSync(authDto.password, 5);
      return res.json(authDto);
    } catch (error) {
      return res.status(400).send('Invalid registration');
    }
  }

  @Post('login')
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    try {
      const user = await findUserByEmail(authDto);
      if (user == undefined) {
        return res.status(400).send('Don`t have user with this email');
      }
      const validPassword = bcrypt.compareSync(authDto.password, user.password);
      if (!validPassword) {
        return res.status(400).send('Invalid password');
      }
      const token = generateAccessToken(user.email, authDto.role);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).send('Invalid login');
    }
  }
}

async function findUserByEmail(
  authDto: AuthDto,
): Promise<Seeker | Employer | Admin | undefined> {
  const seekerRepository = getRepository(Seeker);
  const employerRepository = getRepository(Employer);
  const adminRepository = getRepository(Admin);
  if (authDto.role === 'seeker') {
    return await seekerRepository.findOne({ email: authDto.email });
  }
  if (authDto.role === 'employer') {
    return await employerRepository.findOne({ email: authDto.email });
  }
  if (authDto.role === 'admin') {
    return await adminRepository.findOne({ email: authDto.email });
  }
  return undefined;
}
