"use client";

import { Button, Form, Radio, RadioGroup } from "@heroui/react";
import React from "react";

export default function Validation() {
  const [message, setMessage] = React.useState(null);

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const value = formData.get("plan-validation");

        setMessage(`Your chosen plan is: ${value}`);
      }}
    >
      <RadioGroup
        isRequired
        name="plan-validation"
        // label="Subscription plan" // Replacement for <Label>
        errorMessage="Choose a subscription before continuing." // Replacement for <FieldError>
      >
        <Radio 
          value="teams" 
          description=""
        >
          Teams
        </Radio>
      </RadioGroup>

      <Button className="rounded-2xl bg-white border border-gray-300 px-4 py-1  text-gray-800 hover:bg-gray-200 transition">
        Choose
      </Button>
      
      {message && <p className="text-sm text-default-500">{message}</p>}
    </Form>
  );
}