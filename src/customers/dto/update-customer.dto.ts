import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
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
