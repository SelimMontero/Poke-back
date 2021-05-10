import { inject, Getter} from "@loopback/core";
import { DefaultCrudRepository, repository, HasManyRepositoryFactory} from "@loopback/repository";
import { PokeDbDataSource } from "../datasources";
import { User, UserRelations, PokemonLike} from "../models";
import {PokemonLikeRepository} from './pokemon-like.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly pokemonLikes: HasManyRepositoryFactory<PokemonLike, typeof User.prototype.id>;

  constructor(
    @inject("datasources.PokeDB") dataSource: PokeDbDataSource, @repository.getter('PokemonLikeRepository') protected pokemonLikeRepositoryGetter: Getter<PokemonLikeRepository>,
  ) {
    super(User, dataSource);
    this.pokemonLikes = this.createHasManyRepositoryFactoryFor('pokemonLikes', pokemonLikeRepositoryGetter,);
    this.registerInclusionResolver('pokemonLikes', this.pokemonLikes.inclusionResolver);
  }
}
