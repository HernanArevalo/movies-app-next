import { create } from 'zustand';

interface State {
  trailerOpened: boolean,

  closeTrailer: ()=>void,
  openTrailer: ()=>void,

  firstTime: boolean,
  cancelFirstTime: () =>void

}

export const MoviesStore = create<State>(
  
  (set) => ({
  trailerOpened: false,
  closeTrailer: () => set(() => ({ trailerOpened: false })),
  openTrailer: () => set(() => ({ trailerOpened: true })),

  firstTime: true,
  cancelFirstTime: () => set(()=> ({firstTime: false}))
})

);
