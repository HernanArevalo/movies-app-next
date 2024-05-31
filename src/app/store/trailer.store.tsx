import { create } from 'zustand';

interface State {
  opened: boolean,

  closeTrailer: ()=>void,
  openTrailer: ()=>void,
}

export const trailerStore = create<State>(
  
  (set) => ({
  opened: true,
  closeTrailer: () => set(() => ({ opened: false })),
  openTrailer: () => set(() => ({ opened: true })),
})

);
