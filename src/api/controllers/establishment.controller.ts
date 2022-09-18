import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { 
  Access, 
  Security, 
  Permissions, 
  EstablishmentService
} from 'src/common';

@ApiTags('Establishments')
@Security()
@Controller('/establishment')
export class EstablishmentController {

  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get('/all')
  @Permissions(Access.READ_ESTABLISHMENT)
  fetchAll() {
    return this.establishmentService.fetch();
  }

}
