import { User } from 'src/app/common/user';
 
export class AccessDetails{
    ProjectId: number;
    AccessGroups: string;
    IndividualAccess: User[];
    SCLAMembers: User[];
    ProjectOwner: User[];
}