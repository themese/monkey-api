import { Customer } from "@src/domain-model/customer";
import { CustomerDto } from "../dtos/customer.dto";

export function customerFromDomain(customer: Customer): CustomerDto {
  const { id, name, surname, photo, createdBy, lastUpdatedBy, isDeleted } = customer;
  return {
    id,
    name,
    surname,
    createdBy,
    lastUpdatedBy,
    photo,
    isDeleted,
  };
}