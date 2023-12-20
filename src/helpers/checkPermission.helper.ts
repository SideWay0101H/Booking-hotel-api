// import { User } from "src/user/entities/user.entity";
// import { BadRequestException } from '@nestjs/common';

// export class Permission {
//     static check (id: number,currentUser: User ){
//         if(id === currentUser.id) return;
//         if(currentUser.role === 'manager') return; 
//         throw new BadRequestException('User can not perform action')
//     }
// }