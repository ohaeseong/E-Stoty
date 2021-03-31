import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Member extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50, unique: true })
    member_id: string;

    @Column({ type: 'varchar', length: 1000 })
    pw: string;

    @Column({ type: 'int' })
    access_level: number;

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    create_time: string;
}