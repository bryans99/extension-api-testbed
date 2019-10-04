/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {
  IApiSettings,
  IAuthorizer,
  IRequestInit,
  ITransport,
  IAccessToken
} from "@looker/sdk"
import { ExtensionTransport } from "./extensionTransport"

export class ExtensionSession implements IAuthorizer {
  sudoId: string = ""
  transport: ITransport

  constructor(public settings: IApiSettings, transport?: ITransport) {
    this.settings = settings
    this.transport = transport || new ExtensionTransport(settings)
  }

  // Determines if the authentication token exists and has not expired
  isAuthenticated() {
    // const token = this.activeToken
    // if (!token) return false
    return false
  }

  async authenticate(init: IRequestInit) {
    // const token = this.activeToken
    // if (token) init.headers["X-CSRF-TOKEN"] = token
    // return init
    return new Promise<IRequestInit>((resolve, reject) => {
      reject("Not implemented")
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
