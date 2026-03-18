import fs from "fs";
import { Customer } from "../models/Customer";
import { Policy } from "../models/Policy";
import { Claim } from "../models/Claim";

export function loadCustomerJson(filePath: string): Customer {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function loadPolicyJson(filePath: string): Policy {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function loadClaimJson(filePath: string): Claim {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}