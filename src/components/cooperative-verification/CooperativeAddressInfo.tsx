import React from "react";
import { MapPin } from "lucide-react";
import { FieldSet } from "@/components/cooperative-verification/FieldSet";
import { DataRow } from "@/components/cooperative-verification/data-row";
import { TFormattedCooperativeData } from "@/types/cooperative.type";

interface CooperativeAddressInfoProps {
  cooperative: TFormattedCooperativeData;
}

const CooperativeAddressInfo: React.FC<CooperativeAddressInfoProps> = ({
  cooperative,
}) => {
  return (
    <FieldSet title="Address Information" icon={MapPin}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <DataRow label="Province" value={cooperative.province} />
          <DataRow label="District" value={cooperative.district} />
          <DataRow label="Local Level" value={cooperative.localLevel} />
        </div>
        <div>
          <DataRow label="Ward No." value={cooperative.wardNo} />
          <DataRow label="House No." value={cooperative.houseNo} />
          <DataRow label="Tole/Street" value={cooperative.tole} />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <DataRow
          label="Complete Address"
          value={`${cooperative.tole || ""}, Ward No. ${cooperative.wardNo || ""}, ${cooperative.localLevel || ""}, ${cooperative.district || ""}, ${cooperative.province || ""}`}
        />
      </div>
    </FieldSet>
  );
};

export default CooperativeAddressInfo;
