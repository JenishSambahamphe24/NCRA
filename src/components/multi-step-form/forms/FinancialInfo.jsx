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

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={control}
                    name="numberOfTotalShare"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel required>
                                Total Share Amount
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total number of shares"
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
                    name="totalLiabilities"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Liabilities</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total liabilities"
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
                    name="loanInOperation"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Loan in Operation</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter loan in operation"
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
                    name="totalAmountOfInstitutionalAssets"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Total Institutional Assets</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total institutional assets"
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