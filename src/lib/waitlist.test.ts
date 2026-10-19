import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { deliverWaitlist, validateWaitlist } from "./waitlist.ts";

const valid = {
  name: "Noa Levi",
  email: "noa@example.com",
  phone: "050-123-4567",
  city: "Haifa",
  homeType: "villa",
  role: "homeowner",
};

describe("validateWaitlist", () => {
  it("accepts a complete homeowner signup", () => {
    const result = validateWaitlist(valid);
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.email, "noa@example.com");
      assert.equal(result.value.homeType, "villa");
    }
  });

  it("rejects an empty form", () => {
    const result = validateWaitlist({
      name: " ",
      email: "not-an-email",
      phone: "123",
      city: "",
      homeType: "",
      role: "",
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.errors.name, true);
      assert.equal(result.errors.email, true);
      assert.equal(result.errors.phone, true);
      assert.equal(result.errors.city, true);
      assert.equal(result.errors.homeType, true);
      assert.equal(result.errors.role, true);
    }
  });

  it("accepts a monitoring center with home type not applicable", () => {
    const result = validateWaitlist({
      ...valid,
      role: "center",
      homeType: "na",
      phone: "+972501234567",
    });
    assert.equal(result.ok, true);
  });
});

describe("deliverWaitlist", () => {
  it("does not report the payload as delivered", async () => {
    const result = await deliverWaitlist({
      ...valid,
      homeType: "villa",
      role: "homeowner",
      locale: "he",
      createdAt: "2026-10-19T00:00:00.000Z",
    });
    assert.deepEqual(result, { delivered: false, reason: "not-configured" });
  });
});
