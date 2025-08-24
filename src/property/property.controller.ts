import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
// import { ZodValidationPipe } from './pipes/zodValidationPipe';
// import {
//   CreatePropertyZodSchema,
//   createPropertyZodSchema,
// } from './dto/createPropertyZod.dto';
// import { HeadersDto } from './dto/headers.dto';
// import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): unknown {
    return this.propertyService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ): unknown {
    console.log(typeof sort);
    return this.propertyService.findOne(id);
  }

  // @Post()
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     groups: ['create'],
  //     always: true,
  //   }),
  // )
  // // @HttpCode(HttpStatus.ACCEPTED)
  // create(@Body() body: CreatePropertyDto): unknown {
  //   return body;
  // }

  // @Post()
  // @UsePipes(new ZodValidationPipe(createPropertyZodSchema))
  // create(@Body() body: CreatePropertyZodSchema): unknown {
  //   console.log(body);
  //   return this.propertyService.create();
  // }

  @Post()
  create(@Body() dto: CreatePropertyDto): unknown {
    return this.propertyService.create(dto);
  }

  // @Get(':id/:slug')
  // findByIdAndSlug(@Param() data: unknown): unknown {
  //   return data;
  // }

  @Get(':id/:slug')
  findByIdAndSlug(
    @Param('id') id: string,
    @Param('slug') slug: string,
  ): string {
    return `Property id: ${id} & slug: ${slug}`;
  }

  // @Patch(':id')
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     groups: ['update'],
  //     always: true,
  //   }),
  // )
  // update(
  //   @Body() body: CreatePropertyDto,
  //   @Param('id', ParseIdPipe) id: number,
  //   @RequestHeader(
  //     new ValidationPipe({
  //       validateCustomDecorators: true,
  //     }),
  //   )
  //   header: HeadersDto,
  // ): unknown {
  //   console.log(id);
  //   console.log(body);
  //   console.log(header);

  //   // return body;
  //   // return header;

  //   return this.propertyService.update();
  // }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() body: UpdatePropertyDto,
  ): unknown {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIdPipe) id: number): unknown {
    return this.propertyService.delete(id);
  }
}
