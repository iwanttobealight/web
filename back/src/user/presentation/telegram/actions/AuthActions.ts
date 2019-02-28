import { Injectable } from '@nestjs/common'
import { TelegramActionHandler, Context, PipeContext } from 'nest-telegram'

import { Authenticator } from '@back/user/application/Authenticator'
import { Registrator } from '@back/user/application/Registrator'

import { IsKnownUser } from '../transformer/IsKnownUser'

@Injectable()
export class AuthActions {
  constructor(
    private readonly authenticator: Authenticator,
    private readonly registrator: Registrator,
  ) {}

  @TelegramActionHandler({ onStart: true })
  public async hello(
    ctx: Context,
    @PipeContext(IsKnownUser) loggedIn: boolean,
  ) {
    await ctx.reply('Hello!')

    await ctx.reply(
      loggedIn ? 'Welcome back!' : 'To auth send me "/auth login password"',
    )
  }

  @TelegramActionHandler({ command: 'auth' })
  public async auth(ctx: Context) {
    const [_, login, password] = ctx.message.text.split(' ')

    await this.authenticator.signIn(login, password)
    await this.registrator.addTelegramAccount(login, ctx.from.id)
    await ctx.reply('Success')
  }
}