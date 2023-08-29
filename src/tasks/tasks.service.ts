import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';

@Injectable()
export class TasksService {
  public readonly logger = new Logger(Task.name);
  constructor(
    public readonly appService: AppService,
    @InjectRepository(Task) public readonly taskRepository: Repository<Task>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('This is called every 1 minute');

    // TODO: Move to config file
    const lat = 48.856613;
    const lon = 2.352222;

    const task = new Task();

    try {
      const response = await this.appService.getAirQualityNearestCity(lat, lon, process.env.AIR_QUALITY_API_KEY);
      this.logger.debug(`handleCron response: ${JSON.stringify(response)}`);
      const pollutionData = response;
      if (pollutionData && Object.keys(pollutionData).length > 0) {
        task.ts = new Date(pollutionData.ts);
        task.aqius = response.aqius;
        task.mainus = pollutionData.mainus;
        task.aqicn = pollutionData.aqicn;
        task.maincn = pollutionData.maincn;

        this.logger.debug(`handleCron task: ${JSON.stringify(task)}`);

        await this.taskRepository.save(task);
      } else {
        this.logger.debug('handleCron: no pollution data found ... trying again in 1 minute');
      }
    } catch (error) {
      this.logger.error(`handleCron error: ${JSON.stringify(error)}`);
    }
  }


  async findPollutionConcentration(): Promise<string> {
    const tasks = await this.taskRepository.find();

    if (tasks.length === 0) {
      return 'No tasks found';
    }

    const taskWithMaxConcentration = tasks.reduce((prev, current) => {
      return prev.aqius > current.aqius ? prev : current;
    });

    return taskWithMaxConcentration.ts.toISOString();
  }
}
