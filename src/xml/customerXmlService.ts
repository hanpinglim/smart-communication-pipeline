import fs from "fs";
import { parseStringPromise } from "xml2js";
import { Customer } from "../models/Customer";

export async function parseCustomerXml(xmlPath: string): Promise<Customer> {
  const xml = fs.readFileSync(xmlPath, "utf-8");
  const result = await parseStringPromise(xml);

  const customer = result.Customer;

  return {
    customerId: customer.CustomerId[0],
    name: customer.Name[0],
    email: customer.Email[0],
    phone: customer.Phone[0]
  };
}