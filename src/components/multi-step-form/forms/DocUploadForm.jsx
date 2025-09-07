import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button, Grid } from '@mui/material';

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


            <Grid size={{ xs: 12, sm: 10 }}>
                <FormField
                    control={methods.control}
                    name="nameOfDirective"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Name of regulation/procedure/act in use</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of regulation/procedure/act in use" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
                <FormField
                    control={methods.control}
                    name="issuedDateNp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Issue Date (B.S)</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Grid>
            <div className='w-full flex justify-end'>
                <Button
                    size='small'
                    variant='outlined'
                >
                    Submit
                </Button>
            </div>


            <Grid container spacing={2} component='form'>
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
                        name="auditorName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Auditor Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Auditor Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={methods.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Auditor Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Auditor Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={methods.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>Auditor Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Auditor Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={methods.control}
                        name="icanNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required>ICAN number</FormLabel>
                                <FormControl>
                                    <Input placeholder="ICAN number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={methods.control}
                        name="latestTaxClearance"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Latest tax clearance</FormLabel>
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

                <div className='w-full flex justify-end'>
                    <Button
                        size='small'
                        variant='outlined'
                    >
                        Submit
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};