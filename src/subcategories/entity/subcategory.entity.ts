// import { Category } from "src/categories/entity/category.entity";
// import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class SubCategory {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   label: string;

//   @Column()
//   img: string;

//   @Column()
//   categoryId: number;
//   @OneToOne(type => Category, (category) =>category.subcategory)
//   category: Category
// }