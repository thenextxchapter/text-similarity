"use client";

import { FC, useState } from "react";
import Button from "@/ui/Button";
import { toast } from "@/components/ui/Toast";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);

    try {
      await signUserOut()
    } catch (error) {
      toast({
        title: "Error signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };
  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign In
    </Button>
  );
};

export default SignOutButton;
