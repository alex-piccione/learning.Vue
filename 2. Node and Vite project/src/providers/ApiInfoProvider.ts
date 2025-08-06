/*
We don't use a Pinia store because it doesn't offer a lazy loading mechanism.
This provider allows us to load API Info only when needed, caching the result for future use.
*/

import { getInfo } from '@/services/API/api'

export interface ApiInfo {
  version: string
  authTokenHeader: string
}

// A container for API Info that can be lazily loaded
class ApiInfoProvider {
  private _data: ApiInfo | null = null
  private _loading = false
  private _loadPromise: Promise<ApiInfo> | null = null

  private async load(): Promise<ApiInfo> {
    // Return existing promise if already loading
    if (this._loadPromise) {
      return this._loadPromise
    }

    // Return cached data if already loaded
    if (this._data) {
      return this._data
    }

    // TODO: add a retry mechanism here

    // Start loading
    this._loading = true
    this._loadPromise = getInfo()
      .then((data) => {
        this._data = {
          version: data.version,
          authTokenHeader: data.authTokenHeader,
        }
        this._loading = false
        return this._data
      })
      .catch((error) => {
        this._loading = false
        this._loadPromise = null // Reset promise on error to allow retry
        console.error(`Failed to load API Info: ${error}`)
        throw error
      })

    return this._loadPromise
  }

  /* ... the retry mechanism...
  private async callApiForGetInfo(retry = 10): Promise<ApiInfo> {
    return getInfo()
      .then((data) => {
        this._data = {
          version: data.version,
          authTokenHeader: data.authTokenHeader,
        }
        this._loading = false
        return this._data
      })
      .catch((error) => {
        if (retry > 0) {
          console.warn(`Failed to load API Info, retrying... (${retry} attempts left)`)
          return this.callApiForGetInfo(retry - 1) // Retry loading
        }

        this._loading = false
        this._loadPromise = null // Reset promise on error to allow retry
        console.error(`Failed to load API Info: ${error}`)
        throw error
      })
  }
      */

  // Lazy getters - data is only accessible through these
  async getVersion(): Promise<string> {
    const data = await this.load()
    return data.version
  }

  async getAuthTokenHeader(): Promise<string> {
    const data = await this.load()
    return data.authTokenHeader
  }

  async getData(): Promise<ApiInfo> {
    return await this.load()
  }

  // Utility methods
  get isLoading(): boolean {
    return this._loading
  }

  get isLoaded(): boolean {
    return this._data !== null
  }

  // Force reload (clears cache)
  async reload(): Promise<ApiInfo> {
    this._data = null
    this._loadPromise = null
    return await this.load()
  }

  // Get cached data without triggering load (returns null if not loaded)
  getCachedData(): ApiInfo | null {
    return this._data
  }
}

// Export singleton instance
export const apiInfoProvider = new ApiInfoProvider()

// Alternative: Export class if you want multiple instances
//export { ApiInfoProvider }
