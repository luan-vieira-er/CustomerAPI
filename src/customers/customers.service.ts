import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { customerRepository } from 'src/data-source';
import { ILike } from 'typeorm';
import { SelectCustomerDto } from './dto/select-customer.dto';

@Injectable()
export class CustomersService {  
  async create(createCustomerDto: CreateCustomerDto) {
    console.log("Inserting a new customer into the database...")
    const customer = new Customer()
    customer.fullname = createCustomerDto.fullname
    customer.salary = createCustomerDto.salary
    customer.company_value = createCustomerDto.company_value
    await customerRepository.save(customer)
    console.log("Inserted new customer")
    return customer;
  }

  async findAll(fullname, selected, take, skip) {
    console.log("Loading customers from the database...")
    
    const [result, total] = await customerRepository.findAndCount(
        {
            where: [
              fullname ? { fullname: ILike('%' + fullname + '%') } : {},
              selected ? { selected: selected } : {}
            ],
            order: { created_at: "DESC" },
            take: take || 10,
            skip: skip || 0
        }
    );

    return {
        data: result,
        count: total
    }
  }

  async findOne(id: string) {
    console.log("Loading customer from the database...")
    const customer = await customerRepository.findOneBy({ id })
    console.log("Loaded customers: ", customer)
    return customer;
  }


  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    console.log("Updating a customer...")
    await customerRepository.update(id, updateCustomerDto)
    const customer = this.findOne(id)
    return customer;
  }

  async select(id: string, selectCustomerDto: SelectCustomerDto) {
    console.log("Selecting a customer...")
    await customerRepository.update(id, selectCustomerDto)
    const customer = this.findOne(id)
    return customer;
  }

  async remove(id: string) {
    console.log("Removing a customer... " + id)
    const customer = await customerRepository.delete({ id: id })
    return customer;
  }
}
