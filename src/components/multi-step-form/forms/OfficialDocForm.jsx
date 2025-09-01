import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Grid } from '@mui/material';

export const OfficialDocForm = ({ methods, fiscalYears }) => {
    const years = fiscalYears || [
        { id: 1, yearNepali: "2080", yearEnglish: "2080/81" }
    ];

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="fiscalYearId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Fiscal Year <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value?.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select fiscal year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((fy) => (
                                            <SelectItem key={fy.id} value={fy.id.toString()}>
                                                {fy.yearNepali} / {fy.yearEnglish}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2.5 }}>
                <FormField
                    control={methods.control}
                    name="auditReport"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Audit Report</FormLabel>
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

            <Grid size={{ xs: 12, sm: 2.5 }}>
                <FormField
                    control={methods.control}
                    name="taxClearance"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Tax Clearance</FormLabel>
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

            <Grid size={{ xs: 12, sm: 2.5 }}>
                <FormField
                    control={methods.control}
                    name="boardMeetingDecision"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Board Meeting Decision</FormLabel>
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

            <Grid size={{ xs: 12, sm: 2.5 }}>
                <FormField
                    control={methods.control}
                    name="annualMeetingAttendance"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Annual Meeting Attendance</FormLabel>
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

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={methods.control}
                    name="annualMeetingDecision"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Annual Meeting Decision</FormLabel>
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


            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={methods.control}
                    name="electionRelatedDoc"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Election Related Documents</FormLabel>
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

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={methods.control}
                    name="otherDoc"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Other Documents</FormLabel>
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
                    name="remarks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Remarks</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter any additional remarks"
                                    rows={4}
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