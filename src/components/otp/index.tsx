import React from "react";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";

type Props = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
};

const OTPInput = ({ otp, setOtp }: Props) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
      <div className="flex gap-3">
        <div>
          <InputOTPSlot index={0} className="bg-gray-200" />
        </div>
        <div>
          <InputOTPSlot index={1} className="bg-gray-200" />
        </div>
        <div>
          <InputOTPSlot index={2} className="bg-gray-200" />
        </div>
        <span className="flex items-center text-xl font-bold">-</span>
        <div>
          <InputOTPSlot index={3} className="bg-gray-200" />
        </div>
        <div>
          <InputOTPSlot index={4} className="bg-gray-200" />
        </div>
        <div>
          <InputOTPSlot index={5} className="bg-gray-200" />
        </div>
      </div>
    </InputOTP>
  );
};

export default OTPInput;
