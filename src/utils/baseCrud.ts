import {
  type Document,
  type Model,
  type FilterQuery,
  type UpdateQuery,
} from 'mongoose'
import HttpException from './HttpException'

export interface CRUDBaseInterface<T extends Document> {
  add: (data: Partial<T>) => Promise<T>
  findAll: (query: FilterQuery<T>) => Promise<T[]>
  find: (query: FilterQuery<T>) => Promise<T | null>
  update: (query: FilterQuery<T>, data: UpdateQuery<T>) => Promise<T>
  delete: (query: FilterQuery<T>) => Promise<void>
  getById: (id: string) => Promise<T | null>
  getPaginated: (
    query: FilterQuery<T>,
    page: number,
    limit: number
  ) => Promise<{
    data: T[]
    totalPages: number
  }>
}

export abstract class CRUDBase<T extends Document>
  implements CRUDBaseInterface<T>
{
  protected readonly baseModel: Model<T>

  constructor(baseModel: Model<T>) {
    this.baseModel = baseModel
  }

  public async add(data: Partial<T>): Promise<T> {
    try {
      const resp = await this.baseModel.create(data)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findAll(query: FilterQuery<T>): Promise<T[]> {
    try {
      if (query === undefined) {
        throw new HttpException(400, 'Missing parameter')
      }

      const resp = await this.baseModel.find(query)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async find(query: FilterQuery<T>): Promise<T | null> {
    try {
      if (query === undefined) {
        throw new HttpException(400, 'Missing parameter')
      }

      const data = await this.baseModel.findOne(query)
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async update(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<T> {
    try {
      if (query === undefined) {
        throw new HttpException(400, 'Missing parameter')
      }

      const result = await this.baseModel.findOneAndUpdate(query, data, {
        new: true,
      })

      if (result === null) throw new HttpException(404, 'Resource Not Found!!')

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async delete(query: FilterQuery<T>): Promise<void> {
    try {
      if (query === undefined) {
        throw new HttpException(400, 'Missing parameter')
      }

      await this.baseModel.findOneAndDelete(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async getById(id: string): Promise<T | null> {
    try {
      if (typeof id !== 'string') {
        throw new HttpException(400, 'Missing parameter')
      }

      const result = await this.baseModel.findById(id)
      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async getPaginated(
    query: FilterQuery<T>,
    page: number,
    limit: number
  ): Promise<{
    data: T[]
    totalPages: number
  }> {
    try {
      if (query === undefined) {
        throw new HttpException(400, 'Missing parameter')
      }

      const resp = await this.baseModel.aggregate([
        {
          $facet: {
            totalPages: [
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                },
              },
              {
                $project: {
                  _id: 0,
                  total: {
                    $ceil: {
                      $divide: ['$total', limit],
                    },
                  },
                },
              },
            ],
            data: [
              {
                $sort: {
                  createdAt: -1,
                },
              },
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $project: {
            data: '$data',
            totalPages: '$totalPages.total',
          },
        },
        {
          $unwind: '$totalPages',
        },
      ])

      if (resp.length === 0) {
        return {
          data: [],
          totalPages: 0,
        }
      }

      return {
        data: resp[0].data,
        totalPages: resp[0].totalPages,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
