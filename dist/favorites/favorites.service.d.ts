import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entity/favorites.entity';
export declare class FavoritesService {
    private favoriteRepository;
    constructor(favoriteRepository: Repository<Favorite>);
    setFavorite(data: CreateFavoriteDto): Promise<CreateFavoriteDto & Favorite>;
    deleteFavorite(data: CreateFavoriteDto): Promise<import("typeorm").DeleteResult>;
    getFavorite(data: CreateFavoriteDto): Promise<boolean>;
}
