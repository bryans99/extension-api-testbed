import { ChattyHostConnection } from "@looker/chatty"
import { ExtensionHostApi, ExtensionEvent, ExtensionRequestType } from "./types"

class ExtensionHostApiImpl implements ExtensionHostApi {
  constructor(private chattyHost: ChattyHostConnection) {}

  async verifyHostConnection() {
    return this.sendAndReceive(ExtensionRequestType.VERIFY_HOST)
  }

  async invokeCoreSdkByName(
    apiMethodName: string,
    body?: any,
    params?: any
  ): Promise<any> {
    return this.sendAndReceive(ExtensionRequestType.INVOKE_CORE_SDK, {
      apiMethodName,
      body,
      params
    })
  }

  async invokeCoreSdkByPath(
    httpMethod: string,
    path: string,
    body?: any,
    params?: any,
    options?: any
  ): Promise<any> {
    return this.sendAndReceive(ExtensionRequestType.INVOKE_CORE_SDK, {
      httpMethod,
      path,
      body,
      params,
      options
    })
  }

  async sendAndReceive(type: string, payload?: any): Promise<any> {
    return this.chattyHost
      .sendAndReceive(ExtensionEvent.EXTENSION_API_REQUEST, {
        type,
        payload
      })
      .then(values => values[0])
  }
}

export const createExtensionHost = (
  chattyHost: ChattyHostConnection
): ExtensionHostApi => new ExtensionHostApiImpl(chattyHost)
