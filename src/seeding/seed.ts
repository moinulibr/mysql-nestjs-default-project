import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { PropertyFactory } from './property.factory';
import { UserFactory } from './user.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { MainSeeder } from './main.seeder';
import dbConfig from '../config/db.config';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [PropertyFactory, UserFactory, PropertyFeatureFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource
  .initialize()
  .then(async () => {
    console.log('Data source has been initialized!');

    await datasource.synchronize(true);
    await runSeeders(datasource);

    process.exit();
  })
  .catch((err) => {
    console.error('Error during Data source initialization', err);
  });

export default datasource;
