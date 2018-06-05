import { Organization } from "./organization.model";

    export class Project {
        constructor(
            public ID?: number,
            public Title?: string,
            public CurrentOrganizationId?: number,
            public CurrentOrganization?: Organization)
            
        {}

}

