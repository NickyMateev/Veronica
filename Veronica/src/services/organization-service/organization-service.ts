import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../user-service/user-service';

@Injectable()
export class OrganizationService {
    private userOrganization: FirebaseListObservable<any[]>;
    private organizations: FirebaseListObservable<any[]>;
    private currUser;

    constructor(db: AngularFireDatabase, userService: UserService) {
        this.userOrganization = db.list("/UserOrganization");
        this.organizations = db.list("/Organizations");
        this.currUser = userService.getUser();
    }

    getOrganizationIds() {
        var userId = this.currUser.$key;
        console.log(userId);
        var orgIds = [];
        this.userOrganization.subscribe(userOrganization => {
            for(var i = 0; i < userOrganization.length; i++) {
                if (userOrganization[i].idUser === userId) {
                    orgIds.push(userOrganization[i].idOrganization);
                }
            }
        });

        return orgIds;
    }

    getOrganizations() {
        var organizationIds = this.getOrganizationIds();
        var resultOrganizations = [];
        this.organizations.subscribe(organizations => {
            for(var i = 0; i < organizationIds.length; i++)  {
                var org = organizations.filter(function(organization) {
                    return organization.$key === organizationIds[i];
                });
                if(org.length != 0) {
                    resultOrganizations.push(org[0]);
                }
            }
        });

        return resultOrganizations;
    }
}
