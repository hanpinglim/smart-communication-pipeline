import fs from "fs";
import { parseStringPromise } from "xml2js";
import { Claim } from "../models/Claim";

export async function parseClaimXml(xmlPath: string): Promise<Claim> {
  const xml = fs.readFileSync(xmlPath, "utf-8");
  const result = await parseStringPromise(xml);

  const claim = result.Claim;

  return {
    claimNumber: claim.ClaimNumber[0],
    policyNumber: claim.PolicyNumber[0],
    claimType: claim.ClaimType[0],
    amount: claim.Amount[0]._,
    currency: claim.Amount[0].$.currency,
    status: claim.Status[0]
  };
}