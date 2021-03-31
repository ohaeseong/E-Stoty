import { Response } from 'express';
import { Service } from 'typedi';
import { generatedId } from '../../lib/method';

import * as Validate from '../../lib/validate/book.validate';
import { BookService } from "../../services/book.service";
import { AuthRequest, CreateBook, PublishBook, UpdateBook } from "../../types";

@Service()
export class BookCtrl {
    constructor(
        private bookService: BookService 
    ) { }

    public writeBook = async (req: AuthRequest, res: Response) => {
        console.log('[POST] create book api call');
        const { body } = req;
        const { memberId } = req.decoded;
        
        try {
            await Validate.writeBookValidate(body);
        } catch (error) {
            console.log(error);

            res.status(400).json({
              status: 400,
              message: '잘못된 요청',
            });

            return;
        }

        try {
            const { title, contents } = body;
            const id: string = await generatedId();

            const bookFormData = {
                id,
                member_id: memberId,
                contents,
                title,
              } as CreateBook;

            const book = await this.bookService.createBook(bookFormData);
              
            res.status(200).json({
                status: 200,
                message: '책 저장 성공',
                data: {
                  ...book,
                }
            });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }

    public bookCorrection = async (req: AuthRequest, res: Response) => {
        console.log('[PUT] update book api call');
        const { body } = req;
        const { memberId } = req.decoded;
        
        try {
            await Validate.updateBookValidate(body);
        } catch (error) {
            console.log(error);

            res.status(400).json({
              status: 400,
              message: '잘못된 요청',
            });

            return;
        }

        try {
            const { id, title, contents } = body;

            const bookUpdateFormData = {
                id,
                member_id: memberId,
                contents,
                title,
              } as UpdateBook;

            await this.bookService.updateBook(bookUpdateFormData);

            res.status(200).json({
                status: 200,
                message: '책 수정 성공!',
            });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }

    public onApplyPublisBook = async (req: AuthRequest, res: Response) => {
        console.log('[PUT] cancle book api call');
        const { body } = req;
        const { memberId } = req.decoded;
        
        try {
            await Validate.publishApplyValidate(body);
        } catch (error) {
            console.log(error);

            res.status(400).json({
              status: 400,
              message: '잘못된 요청',
            });

            return;
        }

        try {
            const { id, category, company, email, phone, writer, price, thumbnail_address } = body;

            const bookUpdateFormData = {
                id,
                member_id: memberId,
                category,
                company,
                email,
                phone,
                writer,
                price,
                thumbnail_address
              } as PublishBook;

            const book = await this.bookService.publishSetBook(bookUpdateFormData);

            res.status(200).json({
                status: 200,
                message: '책 출간 신청 성공!',
                data: {
                    ...book,
                }
              });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }

    public onPublishBook = async (req: AuthRequest, res: Response) => {
        console.log('[PUT] publish book api call');
        const { id, isPublish } = req.body;
        const { accessLevel } = req.decoded;

        if (accessLevel !== 0) {
            res.status(403).json({
                status: 403,
                message: '권한 없음',
            });

            return;
        }

        try {
            if (isPublish) {
                await this.bookService.publishBook(id);
            } else {
                await this.bookService.denialPublishBook(id);
            }

            res.status(200).json({
                status: 200,
                message: '책 출간/거부 성공!/',
              });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }

    public getBookList = async (req: AuthRequest, res: Response) => {
        console.log('[GET]  books api call');
        const category: string  = req.query.category as string;
        const limit: string  = req.query.limit as string;

        try {
            const books = await this.bookService.getBooks(parseInt(limit, 10), category);

            res.status(200).json({
                status: 200,
                message: '책 조회 성공!',
                data: {
                    books,
                }
              });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }

    public getWaitingForApplicationBooks = async (req: AuthRequest, res: Response) => {
        console.log('[GET] books api call');
        const { accessLevel } = req.decoded;

        if (accessLevel !== 0) {
            res.status(403).json({
                status: 403,
                message: '권한 없음',
            });

            return;
        }

        try {
            const books = await this.bookService.getWaitingBooks();

            res.status(200).json({
                status: 200,
                message: '책 조회 성공!',
                data: {
                    books,
                }
              });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }

    public bookDetailedInquiry = async (req: AuthRequest, res: Response) => {
        console.log('[GET] get book detail api call');
        const id: string  = req.query.id as string;

        try {
            const book = await this.bookService.getBookDetail(id);
            console.log(book);
            
            res.status(200).json({
                status: 200,
                message: '책 상세 조회 성공!',
                data: {
                    ...book,
                }
              });
        } catch (error) {
            console.log(error);
          
            res.status(500).json({
              status: 500,
              message: '서버 에러',
            });
        }
    }
}