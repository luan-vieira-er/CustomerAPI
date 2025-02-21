import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateCustomerDto {
    
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
