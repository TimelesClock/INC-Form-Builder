import { create } from "zustand";
import type { Question } from '~/types/question';

interface StoreState {
    questions: Question[],
    setQuestions: (questions: Question[]) => void,
}

const useStore = create<StoreState>((set) => ({
    questions: [],
    setQuestions: (questions: Question[]) => set({ questions: questions }),

}));

export default useStore;