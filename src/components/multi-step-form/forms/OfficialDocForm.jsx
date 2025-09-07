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
                            <FormLabel required>Fiscal Year</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select fiscalYear" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Federal">Federal</SelectItem>
                                        <SelectItem value="Province">Province</SelectItem>
                                        <SelectItem value="LocalLevel">Local Level</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="numberOfOCMeetings"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Number of total OC meeting </FormLabel>
                            <FormControl>
                                <Input type='number'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
                <FormField
                    control={methods.control}
                    name="dateOfGAM"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Date of General assembly meeting (GAM) </FormLabel>
                            <FormControl>
                                <Input type='number'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="noOfParticipantsInGAM"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Number of Participants in GAM</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="participantPercentage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Participants Percentage</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="dataEnteredBy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Data Entered By</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Position</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="phoneNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Phone Number</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="dataEntryDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Data entry date</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="dataEnteredBy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Data verified By</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Verifier Position </FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="verifierPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Verifier Phone Number</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="dataEntryDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Data verified date</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>

            {/* Declare checkBox */}

            <Grid size={{ xs: 12, sm: 12 }}>
                <FormField
                    control={methods.control}
                    name="Declaration letter"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>A signed declaration letter</FormLabel>
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