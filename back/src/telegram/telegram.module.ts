import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TelegramModule as OriginalTelegramModule } from 'nest-telegram'

import { ConfigModule } from '$back/config/config.module'
import { UtilsModule } from '$back/utils/utils.module'

import { TelegramOptionsFactory } from './TelegramOptionsFactory'
import { HelpActions } from './telegram/actions/HelpActions'

@Module({
  imports: [
    OriginalTelegramModule.fromFactory({
      imports: [ConfigModule],
      useClass: TelegramOptionsFactory,
    }),
    UtilsModule,
  ],
  providers: [TelegramOptionsFactory, HelpActions],
  exports: [OriginalTelegramModule],
})
export class TelegramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
