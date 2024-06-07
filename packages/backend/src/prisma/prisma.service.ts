import { PrismaClient } from "@nestjs-line-tutorial/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient {}
