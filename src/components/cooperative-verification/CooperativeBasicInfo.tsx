import React from "react";
import { Building } from "lucide-react";
import { FieldSet } from "@/components/cooperative-verification/FieldSet";
import { DataRow } from "@/components/cooperative-verification/data-row";
import { TFormattedCooperativeData } from "@/types/cooperative.type";
import { formatDate } from "date-fns";

interface CooperativeBasicInfoProps {
  cooperative: TFormattedCooperativeData;
}

const CooperativeBasicInfo: React.FC<CooperativeBasicInfoProps> = ({
  cooperative,
}) => {
  return (
    <FieldSet title="Basic Information" icon={Building}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <DataRow
            label="Full Name (English)"
            value={cooperative?.fullNameEnglish}
          />
          <DataRow
            label="Full Name (Nepali)"
            value={cooperative?.fullNameNepali}
          />
          <DataRow
            label="Registration Number"
            value={cooperative?.registrationNumber}
          />
          <DataRow
            label="Cooperative Code"
            value={cooperative?.cooperativeCode}
          />
          <DataRow label="Classification" value={cooperative?.classification} />
          <DataRow label="Working Area" value={cooperative?.workingArea} />
          <DataRow label="Mobile Phone" value={cooperative?.contactMobile} />
          <DataRow label="Office Phone" value={cooperative?.contactOffice} />
          <DataRow label="Email Address" value={cooperative?.email} />
          <DataRow
            label="Male Members"
            value={cooperative?.maleMembers?.toLocaleString()}
          />
          <DataRow
            label="Female Members"
            value={cooperative?.femaleMembers?.toLocaleString()}
          />
        </div>
        <div>
          <DataRow
            label="Registered Date"
            value={
              cooperative?.registeredDate
                ? formatDate(cooperative?.registeredDate, "yyyy-MM-dd")
                : ""
            }
          />
          <DataRow label="Register Year" value={cooperative?.registerYear} />
          <DataRow label="Fiscal Year" value={cooperative?.fiscalYear} />
          <DataRow
            label="Registered Fiscal Year"
            value={cooperative?.registeredFiscalYear}
          />
          <DataRow label="PAN Number" value={cooperative?.panNumber} />
          <DataRow
            label="Branch Offices"
            value={
              cooperative?.anyBranchOffice
                ? `Yes (${cooperative?.numberOfBranches})`
                : "No"
            }
          />
          <DataRow label="Website" value={cooperative?.website} />
          <DataRow label="Contact Person" value={cooperative?.contactPerson} />
          <DataRow label="Contact Phone" value={cooperative?.contactPhone} />
          <DataRow
            label="Total Members"
            value={(
              (cooperative?.maleMembers || 0) +
              (cooperative?.femaleMembers || 0)
            )?.toLocaleString()}
          />
        </div>
      </div>
    </FieldSet>
  );
};

export default CooperativeBasicInfo;
