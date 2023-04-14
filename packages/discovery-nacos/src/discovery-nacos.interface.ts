import { FactoryProvider } from '@nestjs/common'

export interface NacosNamingClientOptions {
  serverList: string | string[]
  namespace?: string
  ssl?: boolean
  ak?: string
  sk?: string
  appName?: string
  endpoint?: string
  vipSrvRefInterMillis?: number
}

export interface NacosNamingInstance {
  instanceId: string
  clusterName: string
  serviceName: string
  ip: string
  port: number
  weight: number
  ephemeral: boolean
  enabled: boolean
  valid: boolean
  marked: boolean
  healthy: boolean
  metadata: any
}

export interface NacosNamingInstanceOptions {
  serviceName: string
  clusterName?: string
  groupName?: string
  ip?: string
  port: number
  weight?: number
  valid?: boolean
  healthy?: boolean
  enabled?: boolean
  ephemeral?: boolean
  metadata?: any
}

export interface NacosNamingSubscribeOptions {
  serviceName: string
  groupName?: string
  clusters?: string
}

export interface DiscoveryNacosOptions {
  client?: NacosNamingClientOptions
  logger?: boolean
  instance?: NacosNamingInstanceOptions
  subscribes?: NacosNamingSubscribeOptions[]
}

export interface DiscoveryNacosAsyncOptions {
  name?: string
  useFactory?: (...args: any[]) => Promise<DiscoveryNacosOptions> | DiscoveryNacosOptions
  inject?: FactoryProvider['inject']
  dependencies?: FactoryProvider['inject']
}
