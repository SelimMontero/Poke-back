import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  PokemonLike, User
} from '../models';
import {UserRepository} from '../repositories';

export class UserPokemonLikeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @authenticate("jwt")
  @get('/users/{id}/pokemon-likes', {
    responses: {
      '200': {
        description: 'Array of User has many PokemonLike',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PokemonLike)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PokemonLike>,
  ): Promise<PokemonLike[]> {
    return this.userRepository.pokemonLikes(id).find(filter);
  }

  @authenticate("jwt")
  @post('/users/{id}/pokemon-likes', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(PokemonLike)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PokemonLike, {
            title: 'NewPokemonLikeInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) pokemonLike: Omit<PokemonLike, 'id'>,
  ): Promise<PokemonLike> {
    return this.userRepository.pokemonLikes(id).create(pokemonLike);
  }

  @authenticate("jwt")
  @patch('/users/{id}/pokemon-likes', {
    responses: {
      '200': {
        description: 'User.PokemonLike PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PokemonLike, {partial: true}),
        },
      },
    })
    pokemonLike: Partial<PokemonLike>,
    @param.query.object('where', getWhereSchemaFor(PokemonLike)) where?: Where<PokemonLike>,
  ): Promise<Count> {
    return this.userRepository.pokemonLikes(id).patch(pokemonLike, where);
  }

  @authenticate("jwt")
  @del('/users/{id}/pokemon-likes', {
    responses: {
      '200': {
        description: 'User.PokemonLike DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PokemonLike)) where?: Where<PokemonLike>,
  ): Promise<Count> {
    return this.userRepository.pokemonLikes(id).delete(where);
  }
}
