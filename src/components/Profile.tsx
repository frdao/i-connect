
export class Profile {
    name: string;
    age: number;
    email: string;
    phoneNumber: number;
    linkedInUrl: string; 
    imgUrl: string;
    education: string; 
    descriptionTitle: string;
    description: string; 
    isEmployer: boolean;

   
    constructor(name: string ,age: number, email:string, phoneNumber:number, linkedInUrl:string, imgUrl: string, education: string, descriptionTitle:string, description: string, isEmployer: boolean) {
      this.name = name;
      this.age = age; 
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.linkedInUrl = linkedInUrl;
      this.imgUrl = imgUrl;
      this.education = education;
      this.descriptionTitle = descriptionTitle;
      this.description = description;
      this.isEmployer = isEmployer;
    }
   
    /* greet() {
      return "Hello, " + this.greeting;
    } */
  }

