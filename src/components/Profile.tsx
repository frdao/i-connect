
export class Profile {
    name: string;
    age: number;
    imgUrl: string;
    education: string; 
    descriptionTitle: string;
    description: string; 

   
    constructor(name: string ,age: number, imgUrl: string, education: string, descriptionTitle:string, description: string) {
      this.name = name;
      this.age = age; 
      this.imgUrl = imgUrl;
      this.education = education;
      this.descriptionTitle = descriptionTitle;
      this.description = description;
    }
   
    /* greet() {
      return "Hello, " + this.greeting;
    } */
  }

