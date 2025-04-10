import type { LucidModel, LucidRow, ModelPaginatorContract, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { filterKeys } from './types.js'

export const whereType: filterKeys = {
  gt: '>',
  lt: '<',
  eq: '=',
  like: '%s%',
  llike: '%s',
  rlike: 's%',
  ignore: 'ignore',
  between: "between",
  with_trashed: 'with_trashed',
  only_trashed: 'only_trashed'
}

export async function queryBuilder(
  query: ModelQueryBuilderContract<LucidModel, LucidRow> | any,
  queryKeys: Record<string, any>,
  queryType: Record<string, string>
): Promise<ModelPaginatorContract<LucidRow>> {
  queryType = Object.assign({
    id: whereType.eq,
    title: whereType.like,
    page: whereType.ignore,
    limit: whereType.ignore,
    created_at: whereType.between,
    updated_at: whereType.between,
    with_trashed: whereType.with_trashed,
    only_trashed: whereType.only_trashed
  }, queryType);
  for (let key in queryKeys) {
    switch (queryType[key]) {
      case whereType.ignore:
        break
      case whereType.eq:
        query = query.where(key, queryKeys[key])
        break
      case whereType.gt:
        query = query.where(key, whereType.gt, queryKeys[key])
        break
      case whereType.lt:
        query = query.where(key, whereType.lt, queryKeys[key])
        break
      case whereType.like:
        query = query.whereLike(key, whereType.like.replace('s', queryKeys[key]))
        break
      case whereType.llike:
        query = query.whereLike(key, whereType.llike.replace('s', queryKeys[key]))
        break
      case whereType.rlike:
        query = query.whereLike(key, whereType.rlike.replace('s', queryKeys[key]))
        break
      case whereType.between:
        let value = queryKeys[key].split('-and-');
        if (value.length == 1) {
          query = query.where(key, '>', value[0])
        } else if (value.length == 2) {
          query = query.whereBetween(key, value)
        }
        break
      case whereType.with_trashed:
        query = query.withTrashed()
        break
      case whereType.only_trashed:
        query = query.onlyTrashed()
        break
      default:
        query = query.where(key, queryKeys[key])
        break;
    }
  }
  let page = parseInt(queryKeys.page ?? '1');
  let limit = parseInt(queryKeys.limit ?? '20');
  if (page < 1) {
    page = 1;
  }
  if (limit < 10) {
    limit = 10;
  } else if (limit > 1000) {
    limit = 1000;
  }
  let paginate = await query.paginate(page, limit);
  paginate.namingStrategy = {
    paginationMetaKeys() {
      return {
        total: 'total',
        perPage: 'per_page',
        currentPage: 'current_page',
        lastPage: 'last_page',
        firstPage: 'first_page',
        firstPageUrl: 'first_page_url',
        lastPageUrl: 'last_page_url',
        nextPageUrl: 'next_page_url',
        previousPageUrl: 'previous_page_url',
      }
    }
  }
  return paginate
}