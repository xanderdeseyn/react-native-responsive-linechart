import { LayoutChangeEvent } from 'react-native';
export declare const useComponentDimensions: () => {
    dimensions: {
        width: number;
        height: number;
    } | undefined;
    onLayout: (event: LayoutChangeEvent) => void;
};
