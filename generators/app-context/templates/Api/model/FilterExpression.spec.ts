import { FilterExpression } from './FilterExpression';

describe('FilterExpression', () => {
  it.each([
    FilterExpression.LikeMode.STARTS_WITH,
    FilterExpression.LikeMode.ENDS_WITH,
    FilterExpression.LikeMode.CONTAINS,
    FilterExpression.LikeMode.EQUALS
  ])('should create like literal for mode %p', (mode) => {
    expect(FilterExpression.likeLiteral('test', mode)).toMatchSnapshot();
  });

  it('should create "in" expression', () => {
    expect(FilterExpression.oneOf('field', ['a', 'b', 'c'])).toMatchSnapshot();
  });

  it('should create "eq" expression', () => {
    expect(FilterExpression.eq('field', 'test')).toMatchSnapshot();
  });

  it.each([
    FilterExpression.LikeMode.STARTS_WITH,
    FilterExpression.LikeMode.ENDS_WITH,
    FilterExpression.LikeMode.CONTAINS,
    FilterExpression.LikeMode.EQUALS
  ])('should create "like" expression for %p mode', (mode) => {
    expect(FilterExpression.like('field', 'test', mode)).toMatchSnapshot();
  });

  it('should create "or" expression for single input', () => {
    expect(FilterExpression.or([FilterExpression.eq('field', 'test')])).toMatchSnapshot();
  });

  it('should create "or" expression for multi input', () => {
    expect(
      FilterExpression.or([
        FilterExpression.eq('field', 'test'),
        FilterExpression.eq('field', 'abc'),
        FilterExpression.like('field', 'efg')
      ])
    ).toMatchSnapshot();
  });

  it('should create "and" expression for single input', () => {
    expect(FilterExpression.and([FilterExpression.eq('field', 'test')])).toMatchSnapshot();
  });

  it('should create "and" expression for multi input', () => {
    expect(
      FilterExpression.and([
        FilterExpression.eq('field', 'test'),
        FilterExpression.eq('field', 'abc'),
        FilterExpression.like('field', 'efg')
      ])
    ).toMatchSnapshot();
  });
});
