import configuration from "./configuration"

export const debug = (...data: any[]) => {
  if (configuration.debug) {
    const now = new Date()
    console.debug(`${now.getMinutes() + ":" + now.getSeconds()} ${data}`)
  }
}
