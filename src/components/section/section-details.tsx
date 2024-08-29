import React from "react";
import LinkSnippet from "./link-snippet";
import { Company, Section, User, $Enums } from "@prisma/client";
import StudentsGraph from "./students-graph";
import CompaniesGraph from "./companies-graph";
import { StudentsTable } from "../tables/students-table";

type Props = {
  section: Section & {
    students: User[];
  } & {
    companies: Company[];
  };
  plan: $Enums.Plans;
};

const SectionDetails = ({ section, plan }: Props) => {
  const { students, companies } = section;
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Section Details</h2>
        <div className="flex flex-col md:flex-row gap-5 pt-5 items-center text-center w-full">
          <div className="w-1/3 flex-grow">
            <StudentsGraph students={students} plan={plan} />
          </div>
          <div className="w-2/3 flex-grow">
            <StudentsTable students={students} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 pt-5 items-center text-center w-full">
          <div className="w-2/3 flex-grow">ass</div>
          <div className="w-1/3 flex-grow">
            <CompaniesGraph companies={companies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
