import express from "express";

const app = express();
const port = 3000;

app.get("/customer", (_req, res) => {
  res.json({
    customerId: "CUST1001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "0412345678"
  });
});

app.get("/policy", (_req, res) => {
  res.json({
    policyNumber: "POL1234",
    customerId: "CUST1001",
    type: "Home Insurance",
    premium: "450",
    currency: "AUD",
    startDate: "2026-04-06"
  });
});

app.get("/claim", (_req, res) => {
  res.json({
    claimNumber: "CLM9001",
    policyNumber: "POL1234",
    claimType: "Storm Damage",
    amount: "3200",
    currency: "AUD",
    status: "Open"
  });
});

app.listen(port, () => {
  console.log(`Mock API running on http://localhost:${port}`);
});