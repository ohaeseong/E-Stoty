import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Member } from '../database/models/Member';

@Service()
export class MemberService {
    constructor(
        @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
    ) {}

    public async login(memberId: string, pw: string) {
        const member = await this.memberRepo.findOne({
            where: {
                member_id: memberId,
                pw,
            },
        });

        return member;
    }
}
