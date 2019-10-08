import { ChattyHostConnection } from "@looker/chatty"
import { Chatty } from "@looker/chatty"
import {
  IAuthorizer,
  IAccessToken,
  IRequestInit,
  IApiSettings,
  LookerSDK,
  DefaultSettings,
  SDKResponse,
  ITransport,
  ITransportSettings,
  HttpMethod
} from "@looker/sdk"

/**
 * Extension event used for chatty communication
 */
export enum ExtensionEvent {
  /**
   * Process request from client. This is actually a sendAndRecieve request
   */
  EXTENSION_API_REQUEST = "EXTENSION_API_REQUEST"
}

/**
 * Request types used by the underlying API. The ENTENSION_API_REQUEST delegates
 * work based upon the request type
 */
export enum ExtensionRequestType {
  /**
   * Verify that the host exists and is working correctly. Host is the Looker window
   * instance that owns the client IFRAME.
   */
  VERIFY_HOST = "VERIFY_HOST",
  /**
   * Execute a call on the Looker CORE SDK
   */
  INVOKE_CORE_SDK = "INVOKE_CORE_SDK",
  /**
   * Update page title
   */
  UPDATE_PAGE_TITLE = "UPDATE_PAGE_TITLE",
  /**
   * Update location
   */
  UPDATE_LOCATION = "UPDATE_LOCATION"
}

/**
 * The message that is associated with the Chatty EXTENSION_API_REQUEST event
 */
export interface ExtensionRequest {
  /**
   * Extension request type
   */
  type: ExtensionRequestType
  /**
   * Optional payload assocoayed with extension request type
   */
  payload?: InvokeCoreSdkRequest | undefined
}

export interface InvokeCoreSdkRequest {
  apiMethodName?: string
  httpMethod?: string
  path?: string
  body?: any
  params?: any
  options?: any
}

export interface UpdatePageTitleRequest {
  pageTitle: string
}

export interface UpdateLocationRequest {
  url: string
  state?: any
}

export interface ExtensionHostApi {
  verifyHostConnection(): Promise<boolean>
  invokeCoreSdkByName(
    methodName: string,
    body?: any,
    params?: any,
    options?: any
  ): Promise<any>
  invokeCoreSdkByPath(
    httpMethod: string,
    path: string,
    body?: any,
    params?: any,
    options?: any
  ): Promise<any>
  updatePageTitle(pageTitle: string)
  updateLocation(url: string, state?: any)
}

export interface ExtensionClientApi {
  handleRequest(message: ExtensionRequest): any | void
}

export const connectExtensionHost = () => {
  return Chatty.createClient()
    .withTargetOrigin("*")
    .build()
    .connect()
    .then(_host => new ExtensionHostApiImpl(_host))
}

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

  updatePageTitle(pageTitle: string) {
    this.send(ExtensionRequestType.UPDATE_PAGE_TITLE, { pageTitle })
  }

  updateLocation(url: string, state?: any) {
    this.send(ExtensionRequestType.UPDATE_LOCATION, { url, state })
  }

  async sendAndReceive(type: string, payload?: any): Promise<any> {
    return this.chattyHost
      .sendAndReceive(ExtensionEvent.EXTENSION_API_REQUEST, {
        type,
        payload
      })
      .then(values => values[0])
  }

  send(type: string, payload?: any) {
    this.chattyHost.send(ExtensionEvent.EXTENSION_API_REQUEST, {
      type,
      payload
    })
  }
}

export class LookerExtensionSDK {
  /**
   * Creates a [[LookerSDK]] object.
   */
  static createClient(hostConnection: ExtensionHostApi) {
    const settings = DefaultSettings()
    const transport = new ExtensionTransport(settings, hostConnection)
    const session = new ExtensionSession(settings, transport)
    return new LookerSDK(session)
  }
}

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

export class ExtensionSession implements IAuthorizer {
  sudoId: string = ""
  transport: ITransport

  constructor(public settings: IApiSettings, transport: ITransport) {
    this.settings = settings
    this.transport = transport
  }

  isAuthenticated() {
    // Assume if the extensions exists then it is authenticated
    return true
  }

  async authenticate(init: IRequestInit) {
    return new Promise<IRequestInit>((resolve, reject) => {
      reject("Authenticate not supported from ExtensionSession")
    })
  }

  async getToken(): Promise<IAccessToken> {
    throw new Error("Access to token is not allowed from ExtensionSession")
  }

  isSudo(): boolean {
    return !!this.sudoId
  }

  async login(sudoId?: string | number): Promise<IAccessToken> {
    return new Promise<IAccessToken>((resolve, reject) =>
      reject("Login not supported from ExtensionSession")
    )
  }

  async logout(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) =>
      reject("Logout not supported from ExtensionSession")
    )
  }

  reset(): void {}
}
