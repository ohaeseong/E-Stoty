import { Router } from 'express';
import { Container, Service } from 'typedi';
import { BookRoute } from './book';

import { MemberRoute } from './member';

@Service()
class RootRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.setRouter();
    }

    private setRouter() {
        this.router.use('/member', Container.get(MemberRoute).getRouter());
        this.router.use('/book', Container.get(BookRoute).getRouter());
    }

    public getRouter() {
        return this.router;
    }
}

export default RootRouter;