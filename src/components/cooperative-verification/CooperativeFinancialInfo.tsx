import React from "react";
import { CreditCard } from "lucide-react";
import { FieldSet } from "@/components/cooperative-verification/FieldSet";
import { DataRow } from "@/components/cooperative-verification/data-row";
import { TFormattedCooperativeData } from "@/types/cooperative.type";

interface CooperativeFinancialInfoProps {
  cooperative: TFormattedCooperativeData;
}

const CooperativeFinancialInfo: React.FC<CooperativeFinancialInfoProps> = ({
  cooperative,
}) => {
  return (
    <FieldSet title="Financial Information" icon={CreditCard}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <DataRow
            label="Total Share Amount"
            value={
              cooperative?.totalShareAmount
                ? `NPR ${cooperative?.totalShareAmount.toLocaleString()}`
                : "N/A"
            }
          />
          <DataRow
            label="Total Shares"
            value={cooperative?.totalShares?.toLocaleString()}
          />
          <DataRow
            label="Total Savings"
            value={
              cooperative?.totalSavingAmount
                ? `NPR ${cooperative?.totalSavingAmount.toLocaleString()}`
                : "N/A"
            }
          />
        </div>
        <div>
          <DataRow
            label="Total Liabilities"
            value={
              cooperative?.totalLiabilities
                ? `NPR ${cooperative?.totalLiabilities.toLocaleString()}`
                : "N/A"
            }
          />
          <DataRow
            label="Loans in Operation"
            value={
              cooperative?.loanInOperation
                ? `NPR ${cooperative?.loanInOperation.toLocaleString()}`
                : "N/A"
            }
          />
          <DataRow
            label="Institutional Assets"
            value={
              cooperative?.institutionalAssets
                ? `NPR ${cooperative?.institutionalAssets.toLocaleString()}`
                : "N/A"
            }
          />
        </div>
      </div>
    </FieldSet>
  );
};

export default CooperativeFinancialInfo;
