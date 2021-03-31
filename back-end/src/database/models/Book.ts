import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Book extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 1000, unique: true })
    id: string;

    @Column({ type: 'varchar', length: 500 })
    title: string;

    @Column({ type: 'text' })
    contents: string;

    @Column({ type: 'varchar', length: 500 })
    member_id: string;

    @Column({ type: 'int' })
    state: number;

    @Column({ type: 'varchar', nullable: true  })
    thumbnail_address: string;

    @Column({ type: 'text', nullable: true  })
    introduce: string;

    @Column({ type: 'varchar', length: 500, nullable: true  })
    writer: string;

    @Column({ type: 'int', nullable: true })
    price: number;

    @Column({ type: 'varchar', length: 500, nullable: true })
    company: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    category: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    phone: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    create_time: string;
}