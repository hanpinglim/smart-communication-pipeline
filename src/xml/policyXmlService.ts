import fs from "fs";
import { parseStringPromise } from "xml2js";
import { Policy } from "../models/Policy";

export async function parsePolicyXml(xmlPath: string): Promise<Policy> {
  const xml = fs.readFileSync(xmlPath, "utf-8");
  const result = await parseStringPromise(xml);

  const policy = result.Policy;

  return {
    policyNumber: policy.PolicyNumber[0],
    customerId: policy.CustomerId[0],
    type: policy.Type[0],
    premium: policy.Premium[0]._,
    currency: policy.Premium[0].$.currency,
    startDate: policy.StartDate[0]
  };
}