import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rating } from '../ratings/rating.entity';
import { Store } from '../stores/store.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string; // Store the hashed password

  @Column({ length: 400 })
  address: string;

  @Column({
    type: 'enum',
    enum: ['system_administrator', 'normal_user', 'store_owner'],
    default: 'normal_user',
  })
  role: string;

  // Define relationships
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Store, (store) => store.owner)
  ownedStores: Store[];
}