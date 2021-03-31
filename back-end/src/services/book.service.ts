import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Book } from '../database/models/Book';
import { CreateBook, PublishBook, UpdateBook } from '../types';

@Service()
export class BookService {
    constructor(
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    ) {}

    public async createBook(body: CreateBook) {
        const book = await this.bookRepo.save({
            ...body,
            state: 0,
        });

        return book;
    }

    public async getBooks(limit: number, category: string) {
        const books = await this.bookRepo.find({
            where: {
              state: 2,
              category,
            },
            order: {
              create_time: "DESC"
            },
            skip: 0,
            take: limit,
        });

        return books;
    }

    public async getWaitingBooks() {
        const books = await this.bookRepo.find({
            where: {
              state: 1,
            },
            order: {
              create_time: "DESC"
            },
        });

        return books;
    }

    public async getBookDetail(id: string) {
        const book = await this.bookRepo.findOne({
            where: {
              id,
            },
        });

        return book;
    }

    public async updateBook(body: UpdateBook) {
        const book = await this.bookRepo.update({
            id: body.id,
            member_id: body.member_id
        }, {
            title: body.title,
            contents: body.contents,
        });

        return book;
    }

    public async deleteBook(id: string) {
        const book = await this.bookRepo.delete({
            id,
        });

        return book;
    }

    public async publishSetBook(body: PublishBook) {
        const book = await this.bookRepo.update({
            id: body.id,
        }, {
            state: 1,
            writer: body.writer,
            price: body.price,
            company: body.company,
            email: body.email,
            phone: body.phone,
            category: body.category,
            thumbnail_address: body.thumbnail_address,
        });

        return book;
    }

    public async publishBook(id: string) {
        const book = await this.bookRepo.update({
            id,
        }, {
            state: 2,
        });

        return book;
    }

    public async denialPublishBook(id: string) {
        const book = await this.bookRepo.update({
            id,
        }, {
            state: 3,
        });

        return book;
    }
}
