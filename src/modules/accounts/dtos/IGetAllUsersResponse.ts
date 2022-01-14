import { Follows } from "@prisma/client";

export interface IGetAllUsersResponse {
  id: string;
  name: string;
  email: string;
  followers: { follower: { id: string; name: string } }[];
  following: { follower: { id: string; name: string } }[];
}
