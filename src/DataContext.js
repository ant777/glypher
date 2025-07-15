import { createContext } from 'react';

export const DataContext = createContext({
    order: '',
    practiceType: '',
    mode: ''
});