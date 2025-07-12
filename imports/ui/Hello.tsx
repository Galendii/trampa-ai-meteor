import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Progress } from "../components/progress";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/input-otp";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";

export const Hello = () => {
  const [counter, setCounter] = useState(0);
  const [otp, setOtp] = useState("");
  const [option, setOption] = useState("");

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[50%] mx-auto">
      <Label className="text-2xl self-start">Test</Label>
      <Progress value={30} />
      <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Input placeholder="Test" />
      <RadioGroup name="test">
        <RadioGroupItem
          onClick={(e) => setOption(e.currentTarget.value)}
          label="test"
          value="1"
        />
        <RadioGroupItem
          label="test"
          value="2"
          onClick={(e) => setOption(e.currentTarget.value)}
        />
        <RadioGroupItem
          label="test"
          value="3"
          onClick={(e) => setOption(e.currentTarget.value)}
        />
      </RadioGroup>
      <label>{option}</label>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>Testing</TooltipTrigger>
          <TooltipContent>Test</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Accordion type="single" className="w-[400px]">
        <AccordionItem value="test">
          <AccordionTrigger>Testing</AccordionTrigger>
          <AccordionContent className="w-screen">Test</AccordionContent>
        </AccordionItem>
        <AccordionItem value="test2">
          <AccordionTrigger>Testing</AccordionTrigger>
          <AccordionContent className="w-screen">Test</AccordionContent>
        </AccordionItem>
        <AccordionItem value="test3">
          <AccordionTrigger>Testing</AccordionTrigger>
          <AccordionContent className="w-screen">Test</AccordionContent>
        </AccordionItem>
        <AccordionItem value="test4">
          <AccordionTrigger>Testing</AccordionTrigger>
          <AccordionContent className="w-screen">Test</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={increment}>Click Me</Button>
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};
