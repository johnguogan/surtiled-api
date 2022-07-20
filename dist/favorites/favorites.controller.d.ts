import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoriteService;
    constructor(favoriteService: FavoritesService);
    setFavorite(setFavorite: CreateFavoriteDto): Promise<any>;
    deleteFavorite(setFavorite: CreateFavoriteDto): Promise<any>;
}
