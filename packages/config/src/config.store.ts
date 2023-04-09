import { get, set, toPairs, mergeWith, assign, isString, isArray, isObject } from 'lodash'
import { compile } from 'handlebars'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigStore {
  private _data: any

  public get data() {
    return this._data
  }

  public set data(data: any) {
    this._data = data
    if (isObject(this._data)) {
      for (const [key, val] of toPairs(this._data)) {
        this.compileWithEnv(key, this._data, val)
      }
    }
  }

  public get<T>(path?: string, defaults?: T): T {
    if (!path) {
      return this._data
    }
    return get(this._data, path, defaults)
  }

  public set(path?: string, values?: any) {
    if (!path) {
      this._data = values
    }
    set(this._data, path, values)
  }

  public merge(data: any) {
    this._data = mergeWith({}, this._data, data, (objValue, srcValue) => {
      if (isArray(objValue)) {
        return srcValue
      }
    })
  }

  public assign(data: any) {
    this._data = assign({}, this._data, data)
  }

  private compileWithEnv(key: string | number, parent: any, config: any) {
    if (isString(config)) {
      const template = compile(config.replace(/\${{/g, '{{'))
      parent[key] = template({ ...process.env, ...this._data })
    } else if (isArray(config)) {
      config.forEach((item, index) => this.compileWithEnv(index, config, item))
    } else if (isObject(config)) {
      for (const [key, val] of toPairs(config)) {
        this.compileWithEnv(key, config, val)
      }
    }
  }
}
