import { Module } from '@nestjs/common';
import { ChattingController } from './chatting.controller';

@Module({
  controllers: [ChattingController]
})
export class ChattingModule {}
