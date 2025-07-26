import { defineStore } from 'pinia'
import { state } from './state'
import { actions } from './action'
import { getters } from './getters'

export const appStore = defineStore('app', {
  state,
  actions,
  getters,
})
