import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        const dbUrl = configService.getOrThrow<string>('DATABASE_URL');
        const adapter = new PrismaPg({ connectionString: dbUrl })
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
        console.log("DataBase connection has been established");
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}

