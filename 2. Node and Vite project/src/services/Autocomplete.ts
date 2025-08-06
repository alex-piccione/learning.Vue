/*
This is used in the Autocomplete service to generate autocomplete names based on the application domain.
Uage:
<input :autocomplete="autocomplete('login.user')" />

This will generate an autocomplete attribute like "yourdomain.login.user".
In this way the autocomplete names are unique to the application domain, preventing conflicts with other applications.
This is useful for forms where you want to use browser's autocomplete feature.
*/

import configuration from '@/configuration'

export const autocomplete = (name: string) => `${configuration.app_domain}.${name}`
export default { autocomplete }
