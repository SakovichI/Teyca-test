jest.mock('class-transformer', () => ({
  plainToInstance: jest.fn(),
  instanceToPlain: jest.fn(),
}));

import { instanceToPlain, plainToInstance } from 'class-transformer';

import { mapInstanceToPlain } from './map-instance-to-plain.helper';

class SampleClass {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

describe('mapInstanceToPlain', () => {
  const sourceObject: SampleClass = { id: 1, name: 'Sample Name' };

  it('should call "plainToInstance" with expected params', () => {
    mapInstanceToPlain(SampleClass, sourceObject);

    expect(plainToInstance).toHaveBeenCalledWith(SampleClass, sourceObject);
  });

  it('should call "instanceToPlain" with expected params', () => {
    const instanceObject: SampleClass = new SampleClass(2, 'New Name');
    (plainToInstance as jest.Mock).mockReturnValueOnce(instanceObject);

    mapInstanceToPlain(SampleClass, sourceObject);

    expect(instanceToPlain).toHaveBeenCalledWith(instanceObject);
  });
});
