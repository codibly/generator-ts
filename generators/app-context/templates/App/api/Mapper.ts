/**
 * Maps TInput to TOutput
 */
export type Mapper<TInput, TOutput> = (input: TInput) => TOutput;

export namespace Mapper {
  /**
   * Higher order mapper that creates array mapper from single mapper
   */
  export function mapArray<TSource, TTarget>(
    mapper: Mapper<TSource, TTarget>
  ): Mapper<TSource[], TTarget[]> {
    return (source) => (source || []).map(mapper);
  }
}
