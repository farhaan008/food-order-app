import { appStore } from '@/stores/app'

const app = appStore()

type Store = ReturnType<typeof appStore> // & ReturnType<typeof pulseStore>;

export const store: Store = {
  ...app,
  // ...pulse, // Uncomment if pulseStore is defined and used
}
