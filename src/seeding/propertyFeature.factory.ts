import { PropertyFeature } from '../entities/propertyFeature.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PropertyFeatureFactory = setSeederFactory(
  PropertyFeature,
  (faker) => {
    const feature = new PropertyFeature();

    feature.bedrooms = faker.number.int({ min: 1, max: 5 });
    feature.bathrooms = faker.number.int({ min: 1, max: 5 });
    feature.parkingSpots = faker.number.int({ min: 0, max: 10 });
    feature.area = faker.number.int({ min: 25, max: 2500 });
    feature.hasBalcony = faker.datatype.boolean();
    feature.hasGardenYard = faker.datatype.boolean();
    feature.hasSwimmingPool = faker.datatype.boolean();

    return feature;
  },
);
