import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categoies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { AppGateway } from './app.gateway';
import { ChattingModule } from './chatting/chatting.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'priva230.spindns.com',
      port: 3306,
      username: 'nousproyec1_surtiled',
      password: 'k~un_+dm[mV_',
      database: 'nousproyec1_surtiled',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/'
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    ChattingModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})

export class AppModule {}
