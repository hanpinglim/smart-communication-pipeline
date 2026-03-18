import { Customer } from "../models/Customer";
import { Policy } from "../models/Policy";
import { Claim } from "../models/Claim";

export async function fetchCustomer(): Promise<Customer> {
  const response = await fetch("http://localhost:3000/customer");
  return response.json();
}

export async function fetchPolicy(): Promise<Policy> {
  const response = await fetch("http://localhost:3000/policy");
  return response.json();
}

export async function fetchClaim(): Promise<Claim> {
  const response = await fetch("http://localhost:3000/claim");
  return response.json();
}