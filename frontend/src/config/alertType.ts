export interface AlertType {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

export const DEFAULT_SNACKBAR_VALUES : AlertType = {
    open: false,
    message: '',
    severity: 'error',
}