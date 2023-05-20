import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './commons/common/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/models/users/entities/user.entity';
import { Room } from './modules/models/rooms/entities/room.entity';
import { Message } from './modules/models/messages/entities/message.entity';
import { Gpt } from './modules/models/gpts/entities/gpt.entity';
import { UsersModule } from './modules/models/users/users.module';
import { RoomsModule } from './modules/models/rooms/rooms.module';
import { MessagesModule } from './modules/models/messages/messages.module';
import { GptsModule } from './modules/models/gpts/gpts.module';
import { AuthModule } from './modules/functions/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      entities: [User, Room, Message, Gpt],
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    MessagesModule,
    GptsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
