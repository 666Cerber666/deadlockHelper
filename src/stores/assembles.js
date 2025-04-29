import { defineStore } from 'pinia'

export const useAssemblesStore = defineStore('assembles', {
  state: () => ({
    assembles: [],
    favorites: []
  }),
  actions: {
    addAssemble(assemble) {
      this.assembles.push(assemble)
    },
    removeAssemble(id) {
      this.assembles = this.assembles.filter(assemble => assemble.id !== id)
    },
    addFavorite(assemble) {
      this.favorites.push(assemble)
    },
    removeFavorite(id) {
      this.favorites = this.favorites.filter(assemble => assemble.id !== id)
    }
  }
})