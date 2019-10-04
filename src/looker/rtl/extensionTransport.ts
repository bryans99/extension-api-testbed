import {
  ISDKError,
  SDKResponse,
  ITransport,
  addQueryParams,
  ITransportSettings,
  HttpMethod
} from "@looker/sdk"

export class ExtensionTransport implements ITransport {
  constructor(private options: ITransportSettings) {
    this.options = options
  }

  async request<TSuccess, TError>(
    method: HttpMethod,
    path: string,
    queryParams?: any,
    body?: any
  ): Promise<SDKResponse<TSuccess, TError>> {
    throw new Error("Not Implemented")
    //     const req = fetch(
    //       this.options.base_url + addQueryParams(path, queryParams),
    //       {
    //         body: body ? JSON.stringify(body) : undefined,
    //         headers: this.options.headers || new Headers(),
    //         credentials: "same-origin",
    //         method
    //       }
    //     )

    //     try {
    //       const res = await req
    //       const contentType = String(res.headers.get("content-type"))
    //       const parsed = await parseResponse(contentType, res)
    //       if (res.ok) {
    //         return { ok: true, value: parsed }
    //       } else {
    //         return { ok: false, error: parsed }
    //       }
    //     } catch (e) {
    //       const error: ISDKError = {
    //         type: "sdk_error",
    //         message:
    //           typeof e.message === "string"
    //             ? e.message
    //             : `The SDK call was not successful. The error was '${e}'.`
    //       }
    //       return { ok: false, error }
    //     }
  }
}

// async function parseResponse(contentType: string, res: Response) {
//   if (contentType.match(/application\/json/g)) {
//     try {
//       return await res.json()
//     } catch (error) {
//       return Promise.reject(error)
//     }
//   } else if (contentType === "text" || contentType.startsWith("text/")) {
//     return res.text()
//   } else {
//     try {
//       return await res.blob()
//     } catch (error) {
//       return Promise.reject(error)
//     }
//   }
// }
