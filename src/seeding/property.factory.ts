import { Property } from '../entities/property.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PropertyFactory = setSeederFactory(Property, (faker) => {
  const property = new Property();

  property.name = faker.location.street();
  property.description = faker.lorem.sentence();
  property.price = +faker.commerce.price({ min: 100000, max: 1000000 });
  property.area = faker.number.int({ min: 50, max: 500 });

  return property;
});
