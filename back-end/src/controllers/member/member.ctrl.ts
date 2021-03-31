import { Response } from 'express';
import { Service } from 'typedi';
import { MemberService } from "../../services/member.service";
import { AuthRequest } from "../../types";
import * as Validate from '../../lib/validate/member.validate';
import * as tokenLib from '../../lib/token.lib';

@Service()
export class MemberCtrl {
    constructor(
        private memberService: MemberService
    ) { }

    public login = async (req: AuthRequest, res: Response) => {
        console.log('[POST] member login api call');
      
        const { body } = req;

        try {
            await Validate.loginValidate(body);
        } catch (error) {
            console.log(error);

            res.status(400).json({
              status: 400,
              message: '잘못된 요청',
            });

            return;
        }
    
        try {
            const { memberId, pw } = body;

            const member = await this.memberService.login(memberId, pw);

            if (!member) {
                res.status(404).json({
                    status: 404,
                    message: '없는 회원 입니다!',
                });

                return;
            }

            const token = await tokenLib.createToken(memberId, member.access_level);
            
            delete member.pw;

          res.status(200).json({
            status: 200,
            message: '로그인 성공!',
            data: {
                token,
                memberData: member,
            }
          });
        } catch (error) {
          console.log(error);
          
          res.status(500).json({
            status: 500,
            message: '서버 에러',
          });
        }
      };
}