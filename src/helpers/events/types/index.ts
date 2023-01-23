import { Event } from "@prisma/client";
import { BluFetch } from "../../BluFetch";

export default interface EventPlaceholder {
  description: string;
  iv?: string | null;
  createdAt?: Date;
  userId: string;
}
