import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateClientDto } from './dto/create-customer.dto';
import { UpdateClientDto } from './dto/update-customer.dto';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The customer has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  create(@Body() createClientDto: CreateClientDto) {
    return this.customersService.create(createClientDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The customers have been successfully loaded.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiQuery({ name: 'fullname', required: false })
  findAll(@Query('fullname') fullname: string, @Query('take') take: number, @Query('skip') skip: number) {
    return this.customersService.findAll(take, skip, fullname);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The customer has been successfully loaded.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.customersService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
