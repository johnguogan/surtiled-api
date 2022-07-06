import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor (
    private favoriteService: FavoritesService
  ) {}

  @Post('')
  setFavorite(@Body() setFavorite: CreateFavoriteDto): Promise<any> {
    console.log("post Favorite: ", setFavorite);
    
    const result = this.favoriteService.setFavorite(setFavorite)
    return result
  }

  @Delete('')
  deleteFavorite(@Body() setFavorite: CreateFavoriteDto): Promise<any> {
    const result = this.favoriteService.deleteFavorite(setFavorite)
    return result
  }
}
