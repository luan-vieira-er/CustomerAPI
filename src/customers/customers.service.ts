import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-customer.dto';
import { UpdateClientDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { clientRepository } from 'src/data-source';
import { ILike } from 'typeorm';

@Injectable()
export class CustomersService {  
  async create(createClientDto: CreateClientDto) {
    console.log("Inserting a new customer into the database...")
    const customer = new Customer()
    customer.fullname = createClientDto.fullname
    customer.salary = createClientDto.salary
    customer.company_value = createClientDto.company_value
    await clientRepository.save(customer)
    console.log("Inserted new customer")
    return customer;
  }

  async findAll(take, skip, fullname) {
    console.log("Loading customers from the database...")
    
    const [result, total] = await clientRepository.findAndCount(
        {
            where: fullname ? { fullname: ILike('%' + fullname + '%') } : {}, order: { created_at: "DESC" },
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
    const customer = await clientRepository.findOneBy({ id })
    console.log("Loaded customers: ", customer)
    return customer;
  }


  async update(id: string, updateClientDto: UpdateClientDto) {
    console.log("Updating a customer...")
    await clientRepository.update(id, updateClientDto)
    const customer = this.findOne(id)
    return customer;
  }

  async remove(id: string) {
    console.log("Removing a customer...")
    const customer = await clientRepository.delete(id)
    return customer;
  }
}
