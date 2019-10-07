import { ExtensionTransport } from "./extensionTransport"
import { LookerSDK, DefaultSettings, IApiSettings } from "@looker/sdk"
import { ExtensionSession } from "./extensionSession"
import { ExtensionHostApi } from "../../extension/api/types"

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
