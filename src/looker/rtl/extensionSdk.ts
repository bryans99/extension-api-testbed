import { ExtensionTransport } from "./extensionTransport"
import { LookerSDK, DefaultSettings, IApiSettings } from "@looker/sdk"
import { ExtensionSession } from "./extensionSession"

export const ExtensionSettings = (): IApiSettings => {
  const settings = DefaultSettings()
  settings.base_url = `${document.location.hostname}:19999`
  return settings
}

export class LookerExtensionSDK {
  /**
   * Creates a [[LookerSDK]] object.
   */
  static createClient() {
    const settings = ExtensionSettings()
    const transport = new ExtensionTransport(settings)
    const session = new ExtensionSession(settings, transport)
    return new LookerSDK(session)
  }
}
