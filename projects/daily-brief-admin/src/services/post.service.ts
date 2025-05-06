import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IPost } from '../../../daily-brief/src/app/model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private auth_token: string =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NDY1NjI5ODgsImV4cCI6MTc0NjU2NjU4OH0.y3IgCZOzCmhvs4ZUxSAEtFs9eBsD0dA-4JqeyoU-jOGa8Uw4gE62yOi7I_dbb5P8IYWkVOsdijCbliTIf34KkA';
  constructor(private http: HttpClient) {}

  getAllPosts() {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };

    return this.http.get<IPost[]>(`${environment.API_URL}/posts`, headers);
  }

  createPost(form: any) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };
    return this.http.post<IPost>(
      `${environment.API_URL}/auth/login`,
      JSON.stringify(form)
    );
  }
}
