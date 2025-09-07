import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Grid } from "@mui/material";

export const FinancialInfo = ({ methods }) => {
    const { control } = methods;
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="TotalNoOfShareMember"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel required>
                                Total Share Members
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total share members"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="noOfTotalMaleMember"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel required>
                                Total Male Members
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter number of male members"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="noOfTotalFemaleMember"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel required>
                                Total Female Members
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter number of female members"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="numberOfTotalShare"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel required>
                                Number of total share
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter number of total share"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="totalShareAmount"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel required>
                                Total Share Amount
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total share amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            {/* Saving */}

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalSavingAmount"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Saving Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total saving amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalGeneralSaving"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total general saving</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="total general saving"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalRegularSaving"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total regular saving</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total regular saving "
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField
                    control={control}
                    name="totalPeriodicSaving"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total periodic saving </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total periodic saving"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            {/* Loan */}
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalLoanAmount"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Loan Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total loan amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalGoodDebt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Good Debt</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total good debt "
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalSubstandardLoan"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total sub-standard loan</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total sub-standard loan "
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="totalBadDebt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total bad debt </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total bad debt"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>



            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalDoubtfulDebt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total doubtful debt</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total doubtful debt"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            {/* Capital, fund */}
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalShareCapital"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Share capital </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total share capital"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>


            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalReserveFund"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total reserve fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total reserve fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalPatronageFund"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total patronage fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total patronage fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="promotionalFund"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total promotional fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total promotional fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="otherFund"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Other Fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Other Fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="primaryCapitalFund"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Primary capital fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Primary capital fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="ratioOfPCF"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Ratio of Primary capital fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=" Ratio of Primary capital fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="totalCapitalFund"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total capital fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total capital fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="ratioOfTCF"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Ratio of Total capital fund</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=" Ratio of Total capital fund"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>


            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="totalLoanLossProvisionAmt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Total loan loss provision amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=" Total loan loss provision amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="generalLoanLossProvisionAmt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> General loan loss provision amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=" General loan loss provision amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="specificLoanLossProvisionAmt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Specific loan loss provision amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=" Specific loan loss provision amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="totalNonPerformingLoan"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Total non performing loan</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=" Total non performing loan"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="ratioOfTNPL"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Ratio of total non performing loan</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Ratio of total non performing loan"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="debtReschedulingAmount"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Debt Rescheduling amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Debt Rescheduling amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="debtReschedulingAmount"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Debt Rescheduling amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Debt Rescheduling amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="operationalIncome"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Operational income</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Operational income"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="otherIncome"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Other income</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Other income"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="operationalExpenditure"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Operational Expenditure</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Operational Expenditure"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="otherExpenditure"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Other Expenditure </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Other Expenditure "
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="totalLiabilities"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Liabilities Amount </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total Liabilities Amount "
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="totalAssetAmount"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Asset Amount </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total Asset Amount "
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="loanInOperation"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Loan in operation </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Loan in operation"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="amountInvestedInPvt"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Amount invested in private company </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Amount invested in private company"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="amountInvestedInHouseAndLand"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Amount invested in house and land </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Amount invested in house and land"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="netProfit"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Net profit </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Net profit"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={control}
                    name="netLoss"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Net Loss </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Net Loss"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

        </Grid>
    );
};