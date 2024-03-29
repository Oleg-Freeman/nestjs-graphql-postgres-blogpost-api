import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { LocalBaseEntity } from '../../../shared/const';
import { BlogPost } from '../../blog-post/entities/blog-post.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Blog extends LocalBaseEntity {
  @Column()
  @Field()
  @IsNotEmpty()
  title: string;

  @Column()
  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, (author) => author.blogs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: User;

  @Column()
  @IsPositive()
  @IsNotEmpty()
  authorId: number;

  @Field(() => [BlogPost])
  @OneToMany(() => BlogPost, (blogPost) => blogPost.blog, { nullable: true })
  blogPosts?: BlogPost[];
}
