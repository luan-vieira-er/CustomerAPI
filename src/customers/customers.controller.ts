import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SelectCustomerDto } from './dto/select-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The customer has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The customers have been successfully loaded.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiQuery({ name: 'fullname', required: false })
  @ApiQuery({ name: 'selected', required: false })
  findAll(@Query('fullname') fullname: string, @Query('selected') selected: boolean, @Query('take') take: number, @Query('skip') skip: number) {
    return this.customersService.findAll(fullname, selected, take, skip );
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The customer has been successfully loaded.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Patch(':id/select')
  select(@Param('id') id: string, @Body() selectCustomerDto: SelectCustomerDto) {
    return this.customersService.select(id, selectCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
