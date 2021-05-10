import {Entity, model, property} from '@loopback/repository';

@model()
export class PokemonLike extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  like: boolean;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  pokemon_id: number;

  @property({
    type: 'number',
  })
  userId?: number;

  constructor(data?: Partial<PokemonLike>) {
    super(data);
  }
}

export interface PokemonLikeRelations {}

export type PokemonLikeWithRelations = PokemonLike & PokemonLikeRelations;
