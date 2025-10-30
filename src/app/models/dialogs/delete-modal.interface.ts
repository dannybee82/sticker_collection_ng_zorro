export interface DeleteModal {
    title: string,
    htmlContent: string,
    okButton?: string,
    okType?: 'primary' | 'default' | 'dashed' | 'link' | 'text' | null,
    cancelButton?: string,
}