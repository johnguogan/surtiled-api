import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entity/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>
  ) {}

  async setFavorite (data: CreateFavoriteDto) {
    return await this.favoriteRepository.save(data)
  }

  async deleteFavorite (data: CreateFavoriteDto) {
    return await this.favoriteRepository.delete(data)
  }

  async getFavorite (data: CreateFavoriteDto) {
    console.log("getFavorite: ", data);
    
    if(await this.favoriteRepository.findOne({ where: data }))
      return true
    else
      return false
  }
}
