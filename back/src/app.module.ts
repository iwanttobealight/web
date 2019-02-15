import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { DbModule } from './db/db.module'
import { MoneyModule } from './money/money.module'
import { UserModule } from './user/user.module'
import { UtilsModule } from './utils/utils.module'

@Module({
  imports: [UserModule, MoneyModule, UtilsModule, ConfigModule, DbModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}