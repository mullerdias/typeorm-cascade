import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Post from './Post';
import Category from './Category';

@Entity('posts_categories')
class PostCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  post_id: string;

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => Post, post => post.post_category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Category, category => category.post_category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

export default PostCategory;
