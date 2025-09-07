import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Grid } from "@mui/material";


export const ExecutiveForm = ({ methods }) => {
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "committee",
    });

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
                        <Card key={field.id} className="px-4 py-2 w-full relative">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <h4 className="text-md font-medium mb-1">Executive Member {index + 1}</h4>
                            <Grid container rowSpacing={1} columnSpacing={2}>

                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className=" text-sm font-medium ">Position</label>
                                    <select
                                        value={methods.watch(`committee.${index}.position`) || ""}
                                        required
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.position`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select Position</option>
                                        <option value="president">President</option>
                                        <option value="vice-president">Vice President</option>
                                        <option value="secretary">Secretary</option>
                                        <option value="treasurer">Treasurer</option>
                                        <option value="member">Member</option>
                                    </select>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        value={methods.watch(`committee.${index}.fullName`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.fullName`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        value={methods.watch(`committee.${index}.gender`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.gender`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="member@example.com"
                                        value={methods.watch(`committee.${index}.email`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.email`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="98XXXXXXXX"
                                        value={methods.watch(`committee.${index}.phoneNumber`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.phoneNumber`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">PAN Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter PAN number"
                                        value={methods.watch(`committee.${index}.panNo`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.panNo`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 1.5 }}>
                                    <label className="block text-sm font-medium mb-1"> NID</label>
                                    <input
                                        type="text"
                                        placeholder="Enter  NID"
                                        value={methods.watch(`committee.${index}.nid`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.nid`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 1.5 }}>
                                    <label className="block text-sm font-medium mb-1">Citizenship No</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Citizenship number"
                                        value={methods.watch(`committee.${index}.citizenshipNo`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.citizenshipNo`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid >

                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Issued district</label>
                                    <input
                                        type="text"
                                        placeholder="Issued district"
                                        value={methods.watch(`committee.${index}.issuedDistrict`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.issuedDistrict`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid >
                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Year of experience</label>
                                    <input
                                        type="text"
                                        value={methods.watch(`committee.${index}.yearOfExperience`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.yearOfExperience`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid >
                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Duration in current position</label>
                                    <input
                                        type="number"
                                        value={methods.watch(`committee.${index}.durationInCurrentPosition`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.durationInCurrentPosition`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid >

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">Province</label>
                                    <select
                                        value={methods.watch(`committee.${index}.province`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.province`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select Province</option>
                                        <option value="koshi">Koshi</option>
                                        <option value="madhesh">Madhesh</option>
                                        <option value="bagmati">Bagmati</option>
                                        <option value="gandaki">Gandaki</option>
                                        <option value="lumbini">Lumbini</option>
                                        <option value="karnali">Karnali</option>
                                        <option value="sudurpashchim">Sudurpashchim</option>
                                    </select>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">District</label>
                                    <input
                                        type="text"
                                        placeholder="Enter district"
                                        value={methods.watch(`committee.${index}.district`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.district`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">Local Level</label>
                                    <input
                                        type="text"
                                        placeholder="Enter local level"
                                        value={methods.watch(`committee.${index}.localLevel`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.localLevel`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Ward No.</label>
                                    <input
                                        type="number"
                                        placeholder="Enter ward no"
                                        value={methods.watch(`committee.${index}.wardNo`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.wardNo`, e.target.valueAsNumber || "")
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid >



                                <Grid size={{ xs: 12, sm: 2 }}>
                                    <label className="block text-sm font-medium mb-1">Tole/Street</label>
                                    <input
                                        type="text"
                                        placeholder="Enter tole or street name"
                                        value={methods.watch(`committee.${index}.tole`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.tole`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">Highest Education</label>
                                    <select
                                        value={methods.watch(`committee.${index}.highestEducation`) || ""}
                                        onChange={(e) =>
                                            methods.setValue(`committee.${index}.highestEducation`, e.target.value)
                                        }
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select Level</option>
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="higher-secondary">Higher Secondary</option>
                                        <option value="bachelors">Bachelors</option>
                                        <option value="masters">Masters</option>
                                        <option value="doctorate">Doctorate</option>
                                    </select>
                                </Grid>

                                {/* <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">PAN Card</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            methods.setValue(`committee.${index}.panCard`, file);
                                        }}
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <label className="block text-sm font-medium mb-1">National ID Card</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            methods.setValue(`committee.${index}.nidCard`, file);
                                        }}
                                        className="w-full p-2 border rounded"
                                    />
                                </Grid> */}
                            </Grid>
                        </Card>
                    ))}
                </>
            )
            }
            <Grid size={{ xs: 12 }}>

            </Grid>
        </Grid >
    );
};