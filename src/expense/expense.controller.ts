import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { GetUserId } from 'src/auth/decorators';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { PaginateDto } from 'src/common/dto';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('expense')
export class ExpenseController {
  constructor(
    private expenseService: ExpenseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60_000)
  @Get()
  getAllUserExpenses(
    @GetUserId() userId: number,
    @Query() paginate: PaginateDto,
  ) {
    return this.expenseService.getAllUserExpenses(userId, paginate);
  }
  @Get(':id')
  getUserExpenseById(
    @GetUserId() userId: number,
    @Param('id') expenseId: number,
  ) {
    return this.expenseService.getUserExpenseById(userId, expenseId);
  }
  @Post()
  createExpense(@GetUserId() userId: number, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(userId, dto);
  }
  @Patch(':id')
  updateUserExpenseById(
    @GetUserId() userId: number,
    @Param('id') expenseId: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateUserExpenseById(userId, expenseId, dto);
  }

  @Delete(':id')
  deleteUserExpenseById(
    @GetUserId() userId: number,
    @Param('id') expenseId: number,
  ) {
    return this.expenseService.deleteUserExpenseById(userId, expenseId);
  }
}
