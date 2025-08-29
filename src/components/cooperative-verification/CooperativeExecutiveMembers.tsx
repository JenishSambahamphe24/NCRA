import React from "react";
import { Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DataRow } from "@/components/cooperative-verification/data-row";
import { FieldSet } from "@/components/cooperative-verification/FieldSet";
import { TFormattedCooperativeData } from "@/types/cooperative.type";

interface CooperativeExecutiveMembersProps {
  cooperative: TFormattedCooperativeData;
}

const CooperativeExecutiveMembers: React.FC<
  CooperativeExecutiveMembersProps
> = ({ cooperative }) => {
  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={Users}>Executive Members</AccordionTrigger>
        <AccordionContent>
          {cooperative?.executiveMembers &&
          cooperative.executiveMembers.length > 0 ? (
            <div className="space-y-3 mt-3">
              {cooperative.executiveMembers.map((member, index) => {
                const fullName = member.name;
                return (
                  <div
                    key={member.id || index}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <DataRow
                          label="Name"
                          value={fullName}
                          className="py-1"
                        />
                        <DataRow
                          label="Position"
                          value={member.position}
                          className="py-1"
                        />
                        <DataRow
                          label="Email"
                          value={member.email}
                          className="py-1"
                        />
                        <DataRow
                          label="Phone"
                          value={member.phone}
                          className="py-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <DataRow
                          label="Gender"
                          value={member.gender}
                          className="py-1"
                        />
                        <DataRow
                          label="Education"
                          value={member.education}
                          className="py-1"
                        />
                        <DataRow
                          label="PAN No."
                          value={member.panNo}
                          className="py-1"
                        />
                        <DataRow
                          label="NID"
                          value={member.nid}
                          className="py-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No executive members information available
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CooperativeExecutiveMembers;
