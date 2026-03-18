import fs from "fs";
import path from "path";
import libxmljs from "libxmljs2";

import { parseCustomerXml } from "./xml/customerXmlService";
import { parsePolicyXml } from "./xml/policyXmlService";
import { parseClaimXml } from "./xml/claimXmlService";

import { fetchCustomer, fetchPolicy, fetchClaim } from "./services/apiDataService";
import { generatePolicyLetter, generateClaimLetter } from "./services/communicationService";
import { saveOutput } from "./services/outputService";
import { loadTemplateConfig } from "./services/templateConfigService";

async function validate(xmlPath: string, xsdPath: string): Promise<void> {
  const xml = fs.readFileSync(xmlPath, "utf-8");
  const xsd = fs.readFileSync(xsdPath, "utf-8");

  const xmlDoc = libxmljs.parseXml(xml);
  const xsdDoc = libxmljs.parseXml(xsd);

  const valid = xmlDoc.validate(xsdDoc);

  if (!valid) {
    console.error("Validation errors:", xmlDoc.validationErrors);
    throw new Error(`XML failed validation: ${path.basename(xmlPath)}`);
  }

  console.log(`Validated ${path.basename(xmlPath)}`);
}

async function runXmlDemo(): Promise<void> {
  const xmlDir = path.join(__dirname, "..", "xml");
  const templateDir = path.join(__dirname, "..", "template");

  const customerXmlPath = path.join(xmlDir, "customer.xml");
  const customerXsdPath = path.join(xmlDir, "customer.xsd");

  const policyXmlPath = path.join(xmlDir, "policy.xml");
  const policyXsdPath = path.join(xmlDir, "policy.xsd");

  const claimXmlPath = path.join(xmlDir, "claim.xml");
  const claimXsdPath = path.join(xmlDir, "claim.xsd");

  const configPath = path.join(__dirname, "..", "config", "templateConfig.json");
  const templateConfig = loadTemplateConfig(configPath);

  const policyTemplatePath = path.join(templateDir, templateConfig.policy);
  const claimTemplatePath = path.join(templateDir, templateConfig.claim);

  await validate(customerXmlPath, customerXsdPath);
  await validate(policyXmlPath, policyXsdPath);
  await validate(claimXmlPath, claimXsdPath);

  const customer = await parseCustomerXml(customerXmlPath);
  const policy = await parsePolicyXml(policyXmlPath);
  const claim = await parseClaimXml(claimXmlPath);

  console.log("XML Customer Data:", customer);
  console.log("XML Policy Data:", policy);
  console.log("XML Claim Data:", claim);

  const policyLetter = generatePolicyLetter(policyTemplatePath, customer, policy);
  const claimLetter = generateClaimLetter(claimTemplatePath, customer, claim);

  saveOutput("policy-letter-xml.html", policyLetter);
  saveOutput("claim-letter-xml.html", claimLetter);

  console.log("XML-based HTML output files created.");
}

async function runApiDemo(): Promise<void> {
  const templateDir = path.join(__dirname, "..", "template");

  const configPath = path.join(__dirname, "..", "config", "templateConfig.json");
  const templateConfig = loadTemplateConfig(configPath);

  const policyTemplatePath = path.join(templateDir, templateConfig.policy);
  const claimTemplatePath = path.join(templateDir, templateConfig.claim);

  const customer = await fetchCustomer();
  const policy = await fetchPolicy();
  const claim = await fetchClaim();

  console.log("API Customer Data:", customer);
  console.log("API Policy Data:", policy);
  console.log("API Claim Data:", claim);

  const policyLetter = generatePolicyLetter(policyTemplatePath, customer, policy);
  const claimLetter = generateClaimLetter(claimTemplatePath, customer, claim);

  saveOutput("policy-letter-api.html", policyLetter);
  saveOutput("claim-letter-api.html", claimLetter);

  console.log("API-based HTML output files created.");
}

async function main(): Promise<void> {
  console.log("============== XML DEMO ==============");
  await runXmlDemo();

  console.log("============== API DEMO ==============");
  await runApiDemo();

  console.log("All demos completed.");
}

main().catch((error) => {
  console.error("Error:", error.message);
});