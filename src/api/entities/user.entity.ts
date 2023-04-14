import { Exclude } from "class-transformer";
import { EntityOptions, Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

const userEntityOptions: EntityOptions = {
    name: 'users',
} 

@Entity(userEntityOptions)
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar' })
    public email: string;

    @Exclude()
    @Column({ type: 'varchar' })
    public password: string;

    @Column({ type: 'varchar', nullable: true })
    public name: string | null;

    @Column({ type: 'timestamp', nullable: true, default: new Date(), name: "last_login_date" })
    public lastLoginDate: Date | null;

    public token: string;

}