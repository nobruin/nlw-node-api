import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity("Surveys")
class Survey {

    @PrimaryColumn()
    readonly id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @CreateDateColumn({name:'created_at'})
    createAt: Date;
    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Survey }