import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { AppService } from 'src/app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [LoggerModule, HttpModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, AppService],
  exports: [TasksService, AppService],
})
export class TasksModule {}
