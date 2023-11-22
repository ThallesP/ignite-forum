import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { PaginationParams } from "@/core/repositories/pagination-params";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  findById(id: UniqueEntityID): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: UniqueEntityID,
    params: PaginationParams
  ): Promise<Answer[]>;
}
