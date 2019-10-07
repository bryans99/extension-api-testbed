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
  INVOKE_CORE_SDK = "INVOKE_CORE_SDK"
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
}

export interface ExtensionClientApi {
  handleRequest(message: ExtensionRequest): any | void
}
