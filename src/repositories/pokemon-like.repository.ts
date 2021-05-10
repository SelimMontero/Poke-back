import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PokeDbDataSource} from '../datasources';
import {PokemonLike, PokemonLikeRelations} from '../models';

export class PokemonLikeRepository extends DefaultCrudRepository<
  PokemonLike,
  typeof PokemonLike.prototype.id,
  PokemonLikeRelations
> {
  constructor(
    @inject('datasources.PokeDB') dataSource: PokeDbDataSource,
  ) {
    super(PokemonLike, dataSource);
  }
}
