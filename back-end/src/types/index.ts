import { Request } from 'express';

export interface AuthRequest extends Request {
    decoded?: any;
}

export interface CreateBook {
    id: string;
    title: string;
    contents: string;
    member_id: string;
}

export interface UpdateBook extends CreateBook {}

export interface PublishBook {
    id: string;
    category: string;
    thumbnail_address: string;
    price: number;
    company: string;
    email: string;
    phone: string;
    writer: string;
}