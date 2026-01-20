import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users= [
        {id:1, name: "Himanshu"},
        {id:2, name: "Himanshu Modi"},
    ];

    getalluser()
    {
        return this.users
    }

    getuserwithid(id:number)
    {
        return this.users.find((user)=> user.id === id)
    }

}
