import configuration from "@/configuration"

export const autocomplete = (name:string) => `${configuration.app_domain}.${name}`
export default { autocomplete}

