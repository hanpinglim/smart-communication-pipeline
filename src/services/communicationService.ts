import fs from "fs";
import { Customer } from "../models/Customer";
import { Policy } from "../models/Policy";
import { Claim } from "../models/Claim";
import { fillTemplate } from "./templateService";

export function generatePolicyLetter(
  templatePath: string,
  customer: Customer,
  policy: Policy
): string {
  const template = fs.readFileSync(templatePath, "utf-8");

  return fillTemplate(template, {
    Name: customer.name,
    PolicyNumber: policy.policyNumber,
    Type: policy.type,
    Premium: policy.premium,
    Currency: policy.currency,
    StartDate: policy.startDate
  });
}

export function generateClaimLetter(
  templatePath: string,
  customer: Customer,
  claim: Claim
): string {
  const template = fs.readFileSync(templatePath, "utf-8");

  return fillTemplate(template, {
    Name: customer.name,
    ClaimNumber: claim.claimNumber,
    PolicyNumber: claim.policyNumber,
    ClaimType: claim.claimType,
    Amount: claim.amount,
    Currency: claim.currency,
    Status: claim.status
  });
}