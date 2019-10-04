export enum ExtensionEvent {
  EXTENSION_API_REQUEST = "EXTENSION_API_REQUEST"
}

export enum ExtensionRequestType {
  VERIFY_HOST = "VERIFY_HOST",
  INVOKE_CORE_SDK = "INVOKE_CORE_SDK"
}

export interface ExtensionRequest {
  type: ExtensionRequestType
  payload?: any
}

export interface ExtensionHostApi {
  verifyHostConnection(): Promise<boolean>
  invokeCoreSdk(methodName: string, body?: any, params?: any): Promise<any>
}
