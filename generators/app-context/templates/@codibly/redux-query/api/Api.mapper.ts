import { Mapper } from 'App/api/Mapper';
import { AxiosError, AxiosResponse } from 'axios';
import { PaginatedResponse } from '../model/PaginatedResponse';
import { Pagination } from '../model/Pagination';
import { ApiDto } from './Api.dto';
import { PaginationMapper } from './Pagination/Pagination.mapper';

export namespace ApiMapper {
  /**
   * Maps Axios Response to response data (response.data)
   */
  export function toResponseData<TResponseData = any>(response: AxiosResponse): TResponseData {
    return response.data;
  }

  /**
   * Maps Axios Response to API response data (response.data.data)
   */
  export function toData<TData = any>(response: AxiosResponse): TData {
    return (toResponseData(response) || {}).data;
  }

  /**
   * Maps Axios Response to API response meta (response.data.meta)
   */
  export function toMeta<TMeta = any>(response: AxiosResponse): TMeta {
    return (toResponseData(response) || {}).meta;
  }

  /**
   * Maps Axios response to API response pagination (response.data.meta.pagination)
   */
  export function toPagination(response: AxiosResponse): Pagination.Statistics {
    return PaginationMapper.fromStatisticsDto((toMeta(response) || {}).pagination || {});
  }

  /**
   * Higher order mapper that maps API response data
   */
  export function mapData<TSource, TTarget>(
    mapper: Mapper<TSource, TTarget>
  ): Mapper<AxiosResponse<ApiDto.Response<TSource>>, TTarget> {
    return (response) => mapper(toData(response));
  }

  /**
   * Higher order mapper that maps API response array data
   */
  export function mapArrayData<TSource, TTarget>(
    mapper: Mapper<TSource, TTarget>
  ): Mapper<AxiosResponse<ApiDto.Response<TSource>>, TTarget[]> {
    return (response) => toData(response).map(mapper);
  }

  /**
   * Higher order mapper that maps API paginated response
   */
  export function mapPaginatedResponse<TSource, TTarget>(
    mapper: Mapper<TSource, TTarget>
  ): Mapper<AxiosResponse<ApiDto.PaginatedResponse<TSource>>, PaginatedResponse<TTarget>> {
    return (response) => ({
      data: toData(response).map(mapper),
      pagination: toPagination(response)
    });
  }

  /**
   * Throws error from API response
   */
  export function throwResponseError(error: AxiosError): never {
    if (error.response) {
      throw error.response;
    }

    throw error;
  }
}
