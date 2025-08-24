import { Property } from '../entities/property.entity';
import { PropertyFeature } from '../entities/propertyFeature.entity';
import { faker } from '@faker-js/faker';
import { PropertyType } from '../entities/PropertyType.entity';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('Seeding property types...');
    const typeRepo = dataSource.getRepository(PropertyType);
    const propertyTypes = await typeRepo.save([
      { value: 'Condo' },
      { value: 'Apartment' },
      { value: 'Villa' },
      { value: 'Townhouse' },
      { value: 'Studio' },
    ]);

    console.log('Seeding users...');
    const userRepo = dataSource.getRepository(User);
    await userRepo.insert([
      {
        firstName: 'Jayanta',
        lastName: 'Biswas',
        email: 'bjayanta.neo@gmail.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      },
    ]);

    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);

    console.log('Seeding properties...');
    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);
    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const property = await propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes),
            propertyFeature: await propertyFeatureFactory.save(),
          });

          return property;
        }),
    );

    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(properties);
  }
}
