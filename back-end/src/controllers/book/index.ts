import { Router } from 'express';
import { Service } from 'typedi';
import authMiddleWare from '../../middlewares/auth.middleware';
import { BookCtrl } from './book.ctrl';

@Service()
export class BookRoute {
    private router: Router;

    constructor(
        public bookCtrl: BookCtrl
    ) {
        this.router = Router();
        this.setRouter();
    }

    public setRouter() {
        this.router.post('/write', authMiddleWare, this.bookCtrl.writeBook);
        this.router.put('/update', authMiddleWare, this.bookCtrl.bookCorrection);
        this.router.put('/publish', authMiddleWare, this.bookCtrl.onPublishBook);
        this.router.put('/apply/publish', authMiddleWare, this.bookCtrl.onApplyPublisBook);
        this.router.get('/detail', this.bookCtrl.bookDetailedInquiry);
        this.router.get('/list', this.bookCtrl.getBookList);
        this.router.get('/waiting/list', authMiddleWare, this.bookCtrl.getWaitingForApplicationBooks);
    }

    public getRouter() {
        return this.router;
    }
}