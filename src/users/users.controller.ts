import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { UsersService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // SuperAdmin فقط (permissions ['*'])
  @Get('admins')
  @Permissions('*')
  listAdmins() {
    return this.usersService.listAdmins();
  }

  @Delete('admins/:id')
  @Permissions('*')
  deleteAdmin(@Param('id') id: string) {
    return this.usersService.deleteAdmin(id);
  }

  @Patch('admins/:id/permissions')
  @Permissions('*')
  updatePerms(@Param('id') id: string, @Body('permissions') permissions: string[]) {
    return this.usersService.updatePermissions(id, permissions || []);
  }
}
