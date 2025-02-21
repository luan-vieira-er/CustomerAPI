import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SelectCustomerDto extends PartialType(CreateCustomerDto) {
    @ApiProperty()
    @IsBoolean()
    selected: boolean
}
