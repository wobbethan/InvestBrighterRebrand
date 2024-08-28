"use client";
import { Copy } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  type: "section" | "company";
};

const LinkSnippet = ({ id, type }: Props) => {
  let snippet = `http://localhost:3000/join/${type}/${id}`;

  return (
    <div className="flex flex-col gap-5 items-center mt-2">
      <div className="bg-cream px-5 py-1 rounded-lg  relative flex flex-row gap-5">
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
        <Copy
          className=" text-gray-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            toast("Copied to clipboard", {
              description:
                "Students can use this link to create an account and join the section",
            });
          }}
        />
      </div>
    </div>
  );
};

export default LinkSnippet;
