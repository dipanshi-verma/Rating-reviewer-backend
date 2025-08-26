import { Controller, Get, Post, Body } from '@nestjs/common';
import { StoresService } from './stores.service'; 

@Controller('stores')
export class StoresController {
    constructor(private storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

}
