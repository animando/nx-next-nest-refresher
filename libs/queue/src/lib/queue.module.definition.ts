import { ConfigurableModuleBuilder } from '@nestjs/common';
import { QueueModuleConfig } from './queue.module.config';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<QueueModuleConfig>().build();
