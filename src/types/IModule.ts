import { Events } from '../types';

export type IModule = {
    [event in `on_${Events}`]: (...args: any[]) => void
};
