import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @ApiProperty()
    @IsString()
    fullname: string
    
    @ApiProperty()
    @IsNumber()
    salary: number
    
    @ApiProperty()
    @IsNumber()
    company_value: number
}
