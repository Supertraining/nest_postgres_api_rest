import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedsRepository: Repository<Breed>,
  ) {}
  async create(createBreedDto: CreateBreedDto) {
    return await this.breedsRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedsRepository.find();
  }

  async findOne(id: number) {
    return this.breedsRepository.findOneBy({ id });
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} ${updateBreedDto} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
