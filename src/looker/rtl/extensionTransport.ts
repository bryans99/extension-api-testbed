import {
  SDKResponse,
  ITransport,
  ITransportSettings,
  HttpMethod
} from "@looker/sdk"
import { ExtensionHostApi } from "../../extension/api/types"

export class ExtensionTransport implements ITransport {
  constructor(
    private options: ITransportSettings,
    private hostConnection: ExtensionHostApi
  ) {
    this.options = options
    this.hostConnection = hostConnection
  }

  async request<TSuccess, TError>(
    method: HttpMethod,
    path: string,
    queryParams?: any,
    body?: any
  ): Promise<SDKResponse<TSuccess, TError>> {
    return this.hostConnection.invokeCoreSdkByPath(
      method,
      path,
      body,
      queryParams
    )
  }
}
