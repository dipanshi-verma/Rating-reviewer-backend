import{
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Rating } from '../ratings/rating.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  // Define relationships
  @ManyToOne(() => User, (user) => user.ownedStores)
  owner: User;

  @OneToMany(() => Rating, (rating) => rating.store)
  ratings: Rating[];
}