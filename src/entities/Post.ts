import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import PostCategory from './PostCategory';

@Entity('posts')
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @OneToMany(() => PostCategory, post_category => post_category.post, {
    cascade: true,
  })
  post_category: PostCategory[];
}
