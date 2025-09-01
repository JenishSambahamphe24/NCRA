import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Grid } from '@mui/material';

export const DocUploadForm = ({ methods }) => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 2.4 }}>
                <FormField
                    control={methods.control}
                    name="businessRegisterCertificate"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>
                                Business Registration Certificate <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) onChange(file);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2.4 }}>
                <FormField
                    control={methods.control}
                    name="panRegisterCertificate"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>PAN Certificate</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) onChange(file);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2.4 }}>
                <FormField
                    control={methods.control}
                    name="otherRegisterCertificate"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Other Business Related Certificate</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) onChange(file);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2.4 }}>
                <FormField
                    control={methods.control}
                    name="approvalbyLaw"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Approval bylaw of cooperatives</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) onChange(file);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2.4 }}>
                <FormField
                    control={methods.control}
                    name="feasibilityReport"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Feasibility report </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) onChange(file);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
                <FormField
                    control={methods.control}
                    name="remark"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Remarks</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter any additional remarks"
                                    {...field}
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