import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Grid, Table, TableContainer, TableHead, TableCell, TableBody } from "@mui/material";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import '../formStyle.css'
export const CommitteeForm = ({ methods }) => {
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "committee",
    });
    const { control, watch, getValues, reset } = methods;
    const addMember = () => {
        append({
            committeeFormulationAssembly: "",
            position: "",
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "",
            ethnicity: "",
            email: "",
            phoneNumber: "",
            panNo: "",
            nid: "",
            province: "",
            district: "",
            localLevel: "",
            wardNo: "",
            houseNumber: "",
            tole: "",
            highestEducation: "",
            panCard: null,
            nidCard: null,
        });
    };

    return (
        <>
            <Grid container direction='column' spacing={2}>
                <div className="flex justify-between items-center">
                    <Button type="button" variant="outline" onClick={addMember} className="flex items-center gap-1">
                        <PlusCircle className="h-4 w-4 text-xs" />
                        Add Member
                    </Button>
                </div>

                {fields.length === 0 ? (
                    <Card className="p-6 text-center text-gray-500">
                        No committee members added yet. Click "Add Member" to begin.
                    </Card>
                ) : (
                    <>
                        {fields.map((field, index) => (
                            <Card key={field.id} className="px-4 pt-1 pb-2 w-full relative">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <h4 className="text-md font-medium mb-1">Committee Member {index + 1}</h4>
                                <Grid container rowSpacing={1} columnSpacing={2}>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.committeeFormulationAssembly`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Committee Type</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="executive">Executive Committee</SelectItem>
                                                                <SelectItem value="supervisory">Supervisory Committee</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
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
                                            control={control}
                                            name={`committee.${index}.position`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Position</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Position" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="president">President</SelectItem>
                                                                <SelectItem value="vice-president">Vice President</SelectItem>
                                                                <SelectItem value="secretary">Secretary</SelectItem>
                                                                <SelectItem value="treasurer">Treasurer</SelectItem>
                                                                <SelectItem value="member">Member</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.fullName`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter full name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.gender`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Gender</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Gender" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.email`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="member@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.phoneNumber`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input type="tel" placeholder="98XXXXXXXX" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.panNo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>PAN Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter PAN number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 1.5 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.nid`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NID</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter NID" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 1.5 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.citizenshipNo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Citizenship No</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter Citizenship number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.issuedDistrict`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Issued District</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Issued district" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.termStartDate`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Term Start Date</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.termEndDate`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Term End Date</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.province`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Province</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Province" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="koshi">Koshi</SelectItem>
                                                                <SelectItem value="madhesh">Madhesh</SelectItem>
                                                                <SelectItem value="bagmati">Bagmati</SelectItem>
                                                                <SelectItem value="gandaki">Gandaki</SelectItem>
                                                                <SelectItem value="lumbini">Lumbini</SelectItem>
                                                                <SelectItem value="karnali">Karnali</SelectItem>
                                                                <SelectItem value="sudurpashchim">Sudurpashchim</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.district`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>District</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter district" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.localLevel`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Local Level</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter local level" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 2 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.wardNo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel required>Ward No.</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter ward no"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(e.target.value ? parseInt(e.target.value) : "")
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
                                            name={`committee.${index}.tole`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tole/Street</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter tole or street name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <FormField
                                            control={control}
                                            name={`committee.${index}.highestEducation`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Highest Education</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Level" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="primary">Primary</SelectItem>
                                                                <SelectItem value="secondary">Secondary</SelectItem>
                                                                <SelectItem value="higher-secondary">Higher Secondary</SelectItem>
                                                                <SelectItem value="bachelors">Bachelors</SelectItem>
                                                                <SelectItem value="masters">Masters</SelectItem>
                                                                <SelectItem value="doctorate">Doctorate</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Grid>

                                </Grid>
                                <div className="w-full flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="small"
                                        className="px-[8px] py-[4px]"
                                    >
                                        save member
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </>
                )}

            </Grid>

            <Grid container spacing={2} mt={1}>
                <TableContainer sx={{ borderRadius: 2 }}>
                    <Table >
                        <TableHead className="bg-[#052D6A]">
                            <TableCell sx={{ padding: '4px' }} className='table-head'>
                                <h1>S.No</h1>
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }} className='table-head'>
                                <h1>Branch Name</h1>
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }} className='table-head'>
                                <h1>Manager Name</h1>
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }} className='table-head'>
                                <h1>Contact Number</h1>
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }} className='table-head'>
                                <h1>Location</h1>
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }} className='table-head'>
                                <h1>Action</h1>
                            </TableCell>
                        </TableHead>
                        <TableBody sx={{ bgcolor: "white" }}>
                            <TableCell className="table-body-cell" sx={{ padding: '4px' }}>
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell" sx={{ padding: '4px' }}>
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell" sx={{ padding: '4px' }}>
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell" sx={{ padding: '4px' }}>
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell" sx={{ padding: '4px' }}>
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell" sx={{ padding: '4px' }}>
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>

                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            <div className="flex justify-between pt-4">
                <Button
                    type="button"
                    variant="outline"
                >
                    Previous
                </Button>

                <Button
                    type="button"
                >
                    Next Step
                </Button>
            </div>
        </>
    );
};