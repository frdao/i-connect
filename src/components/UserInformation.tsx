import { Profile } from "./Profile";

export class UserInformation {         
    private profile: Profile | undefined;

    public setProfile(profile: Profile): void {

        if(profile != null){
            this.profile = profile; 
        }
    }

    public getProfile(): Profile {
        return this.profile!;
    }
}