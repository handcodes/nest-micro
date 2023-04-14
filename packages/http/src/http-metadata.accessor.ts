import { AxiosRequestConfig, AxiosAdapter } from 'axios'
import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Interceptor } from './interfaces/interceptor.interface'
import { ParamsMetadata } from './interfaces/params-metadata.interface'
import {
  REQUEST_PATH_METADATA,
  REQUEST_METHOD_METADATA,
  REQUEST_OPTIONS_METADATA,
  PARAMETER_METADATA,
  RESPONSE_METADATA,
  ADAPTER_METADATA,
  INTERCEPTOR_METADATA,
} from './http.constants'

@Injectable()
export class HttpMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getPath(target: Function): string {
    return this.reflector.get(REQUEST_PATH_METADATA, target)
  }

  getMethod(target: Function): string {
    return this.reflector.get(REQUEST_METHOD_METADATA, target)
  }

  getOptions(target: Function): AxiosRequestConfig {
    return this.reflector.get(REQUEST_OPTIONS_METADATA, target)
  }

  getParams(target: Function): ParamsMetadata {
    return this.reflector.get(PARAMETER_METADATA, target)
  }

  getResponse(parent: Function, target: Function): string {
    return this.reflector.getAllAndOverride(RESPONSE_METADATA, [parent, target])
  }

  getAdapterRefs(parent: Function, target: Function): AxiosAdapter[] {
    return this.reflector.getAllAndMerge(ADAPTER_METADATA, [parent, target])
  }

  getInterceptorRefs(parent: Function, target: Function): Interceptor[] {
    return this.reflector.getAllAndMerge(INTERCEPTOR_METADATA, [parent, target])
  }
}