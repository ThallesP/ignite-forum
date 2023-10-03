import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { PaginationParams } from "@/core/repositories/pagination-params";

export interface QuestionsRepository {
  findById(id: UniqueEntityID): Promise<Question | null>;
  findManyRecent({ page }: PaginationParams): Promise<Question[]>;
  create(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
