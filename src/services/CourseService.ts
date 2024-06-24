import { ApiService } from "./ApiService";

class CourseService extends ApiService {

  constructor(baseURL: string) {
    super(baseURL);
  }
 
  public async getCourseList(): Promise<any> {
    console.log('getCourseList');   
    return await super.get("/course", {});
  }

  public async getCourse(id:string): Promise<any> {
    return await super.get("/course/"+id, {});
  }

  public async registerToCourse(course_id: string): Promise<any> {
    const response = await super.post("/course/register", { course_id });
    return response;
  }
  public async unRegisterToCourse(course_id: string): Promise<any> {
    const response = await super.post("/course/unregister", { course_id });
    return response;
  }
}

export const courseService = new CourseService();
