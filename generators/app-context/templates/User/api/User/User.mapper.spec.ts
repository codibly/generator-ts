import { UserMapper } from './User.mapper';

describe('UserMapper', () => {
  it('should convert bit mask to array of bit masks', () => {
    expect(UserMapper.permissionNumberToArray(0b01101001001011010010100101101001)).toEqual([
      1,
      8,
      32,
      64,
      256,
      2048,
      8192,
      65536,
      262144,
      524288,
      2097152,
      16777216,
      134217728,
      536870912,
      1073741824
    ]);
  });

  it('should convert bit mask to empty array for 0 bit mask', () => {
    expect(UserMapper.permissionNumberToArray(0)).toEqual([]);
  });

  it('should convert array of bit masks to bit mask', () => {
    expect(
      UserMapper.permissionArrayToNumber([
        1,
        8,
        32,
        64,
        256,
        2048,
        8192,
        65536,
        262144,
        524288,
        2097152,
        16777216,
        134217728,
        536870912,
        1073741824
      ])
    ).toEqual(0b01101001001011010010100101101001);
  });

  it('should convert empty array of bit masks to 0 bit mask', () => {
    expect(UserMapper.permissionArrayToNumber([])).toEqual(0);
  });
});
