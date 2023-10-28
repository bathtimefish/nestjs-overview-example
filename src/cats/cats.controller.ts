import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  // HttpException,
  // HttpStatus,
  ForbiddenException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from '../dto/cat.dto';
import { CatsService } from './cats.service';
import type { Cat } from '../interfaces/cat';
import { ValidationPipe } from 'src/validation.pipe';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from 'src/auth.guard';

@Controller('cats')
@UseGuards(RolesGuard, AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    const resp = {
      status: 'success',
      message: 'Cat created successfully',
      data: createCatDto,
    };
    return JSON.stringify(resp);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<string> {
    try {
      const cats: Cat[] = this.catsService.findAll();
      const resp = {
        status: 'success',
        message: 'Cats retrieved successfully',
        data: cats,
        limit: query.limit,
      };
      return JSON.stringify(resp);
    } catch (error) {
      throw new ForbiddenException();
      /*
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
      */
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCatDto: UpdateCatDto,
  ) {
    const resp = {
      status: 'success',
      message: `Cat #${id} updated successfully`,
      data: updateCatDto,
    };
    return JSON.stringify(resp);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} cat`;
  }
}
