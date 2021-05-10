import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'PokeDB',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'asd12345',
  database: 'pokedb',
};

@lifeCycleObserver('datasource')
export class PokeDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'PokeDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.PokeDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
