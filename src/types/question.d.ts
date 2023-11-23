export interface Question {
    id: string;
    type: string;
    text: string;
    required?: boolean;
    options?: Option[];
}

export interface Option {
    id: string;
    content: string;
}