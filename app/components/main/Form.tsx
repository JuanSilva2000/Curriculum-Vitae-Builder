import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { useForm } from "react-hook-form";
import { PlusIcon, TrashIcon } from "lucide-react"

interface Education {
    id: number
    university: string
    career: string
    startDate: string
    endDate: string
}

interface Experience {
    id: number
    company: string
    position: string
    startDate: string
    endDate: string
}

interface TechnicalSkill {
    id: number
    name: string
}

interface FormProps {
    onValuesChange: (values: any) => void
}

const Form = ({ onValuesChange }: FormProps) => {
    const [educations, setEducations] = useState<Education[]>([
        { id: 1, university: "", career: "", startDate: "", endDate: "" }
    ])

    const [experiences, setExperiences] = useState<Experience[]>([
        { id: 1, company: "", position: "", startDate: "", endDate: "" }
    ])

    const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([
        { id: 1, name: "" }
    ])

    const addTechnicalSkill = () => {
        const newId = technicalSkills.length > 0 ? Math.max(...technicalSkills.map(ts => ts.id)) + 1 : 1
        setTechnicalSkills([...technicalSkills, { id: newId, name: "" }])
    }

    const removeTechnicalSkill = (id: number) => {
        if (technicalSkills.length > 1) {
            setTechnicalSkills(technicalSkills.filter(ts => ts.id !== id))
        }
    }

    const addExperience = () => {
        const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1
        setExperiences([...experiences, { id: newId, company: "", position: "", startDate: "", endDate: "" }])
    }

    const removeExperience = (id: number) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter(exp => exp.id !== id))
        }
    }

    const addEducation = () => {
        const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1
        setEducations([...educations, { id: newId, university: "", career: "", startDate: "", endDate: "" }])
    }

    const removeEducation = (id: number) => {
        if (educations.length > 1) {
            setEducations(educations.filter(edu => edu.id !== id))
        }
    }

    const { register, watch } = useForm();

    useEffect(() => {
        const subscription = watch((values) => {
            onValuesChange(values)
        })
        return () => subscription.unsubscribe()
    }, [watch, onValuesChange])

    return (
        <form className="flex flex-col gap-1 bg-gray-100 p-4 rounded-lg w-9/20">
            <Accordion type="single" collapsible className="gap-2" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">Personal Data</AccordionTrigger>
                    <AccordionContent>
                        <FieldGroup>
                            <FieldSet>
                                <div className="flex gap-4">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="checkout-7j9-full-name-43j">
                                                Full Name
                                            </FieldLabel>
                                            <Input
                                                id="checkout-7j9-full-name-43j"
                                                placeholder="Full Name"
                                                required
                                                type="text"
                                                {...register("fullName")}
                                            />
                                        </Field>
                                    </FieldGroup>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="checkout-7j9-full-name-43j">
                                                Professional Role
                                            </FieldLabel>
                                            <Input
                                                id="checkout-7j9-full-name-43j"
                                                placeholder="Software Developer"
                                                required
                                                type="text"
                                                {...register("professional_role")}
                                            />
                                        </Field>
                                    </FieldGroup>

                                </div>

                                <div className="flex gap-4">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="checkout-7j9-email-43j">
                                                Email
                                            </FieldLabel>
                                            <Input
                                                id="checkout-7j9-email-43j"
                                                placeholder="Email"
                                                required
                                                type="email"
                                                {...register("email")}
                                            />
                                        </Field>
                                    </FieldGroup>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="checkout-7j9-phone-43j">
                                                Phone
                                            </FieldLabel>
                                            <Input
                                                id="checkout-7j9-phone-43j"
                                                placeholder="+51 999 999 999"
                                                required
                                                type="tel"
                                                {...register("phone")}
                                            />
                                        </Field>
                                    </FieldGroup>
                                </div>

                                <div className="flex gap-4">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="checkout-7j9-linkedin-43j">
                                                LinkedIn
                                            </FieldLabel>
                                            <Input
                                                id="checkout-7j9-linkedin-43j"
                                                placeholder="https://www.linkedin.com/in/Name"
                                                required
                                                type="url"
                                                {...register("linkedin")}
                                            />
                                        </Field>
                                    </FieldGroup>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="checkout-7j9-github-43j">
                                                GitHub
                                            </FieldLabel>
                                            <Input
                                                id="checkout-7j9-github-43j"
                                                placeholder="https://github.com/Nickname"
                                                required
                                                type="url"
                                                {...register("github")}
                                            />
                                        </Field>
                                    </FieldGroup>
                                </div>

                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-description-43j">
                                            Description
                                        </FieldLabel>
                                        <Textarea
                                            id="checkout-7j9-description-43j"
                                            placeholder="Description"
                                            required
                                            {...register("descriptionPData")}
                                        />
                                    </Field>
                                </FieldGroup>

                            </FieldSet>

                        </FieldGroup>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">Education</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-6 overflow-y-auto h-[54vh] p-2">
                            {educations.map((education, index) => (
                                <div key={education.id} className="relative border border-gray-300 rounded-lg p-4">
                                    {educations.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => removeEducation(education.id)}
                                            className="absolute top-2 right-2 p-2 h-8 w-8 bg-[#970404] hover:bg-[#970404]/80 text-white cursor-pointer"
                                            title="Remove education"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    )}

                                    <FieldGroup>
                                        <FieldSet>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor={`university-${education.id}`}>
                                                        University or Institute
                                                    </FieldLabel>
                                                    <Input
                                                        id={`university-${education.id}`}
                                                        placeholder="National University of Engineering"
                                                        required
                                                        type="text"
                                                        {...register(`university_${education.id}`)}
                                                    />
                                                </Field>
                                            </FieldGroup>

                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor={`career_${education.id}`}>
                                                        Career
                                                    </FieldLabel>
                                                    <Input
                                                        id={`career_${education.id}`}
                                                        placeholder="Computer Science"
                                                        required
                                                        type="text"
                                                        {...register(`career_${education.id}`)}
                                                    />
                                                </Field>
                                            </FieldGroup>

                                            <div className="flex gap-4">
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor={`start_date_education_${education.id}`}>
                                                            Start Date
                                                        </FieldLabel>
                                                        <Input
                                                            id={`start_date_education_${education.id}`}
                                                            placeholder="2020"
                                                            required
                                                            type="text"
                                                            {...register(`start_date_education_${education.id}`)}
                                                        />
                                                    </Field>
                                                </FieldGroup>

                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor={`end_date_education_${education.id}`}>
                                                            End Date
                                                        </FieldLabel>
                                                        <Input
                                                            id={`end_date_education_${education.id}`}
                                                            placeholder="2025"
                                                            required
                                                            type="text"
                                                            {...register(`end_date_education_${education.id}`)}
                                                        />
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                        </FieldSet>
                                    </FieldGroup>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={addEducation}
                                    className="flex items-center gap-2 bg-[#5E548E] hover:bg-[#443B6F] text-white cursor-pointer"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                    Add Education
                                </Button>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">Technical Skills</AccordionTrigger>
                    <AccordionContent>
                        <div className={`flex flex-col gap-6 overflow-y-auto ${technicalSkills.length > 1 ? 'h-[50vh]' : 'h-[20vh]'}`}>
                            {technicalSkills.map((skill, index) => (
                                <div key={skill.id} className="relative border border-gray-300 rounded-lg p-4">
                                    <FieldGroup>
                                        <Field>
                                            <Input
                                                id={`skill_${skill.id}`}
                                                placeholder="React"
                                                required
                                                type="text"
                                                {...register(`skill_${skill.id}`)}
                                            />

                                            {technicalSkills.length > 1 && (
                                                <div className="flex justify-end">
                                                    <Button
                                                        type="button"
                                                        onClick={() => removeTechnicalSkill(skill.id)}
                                                        className="cursor-pointer bg-[#970404] hover:bg-[#970404]/80"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </Field>
                                    </FieldGroup>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={addTechnicalSkill}
                                    className="flex items-center gap-2 bg-[#5E548E] hover:bg-[#443B6F] text-white cursor-pointer"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                    Add Technical Skill
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">Experience</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-6 overflow-y-auto h-[51vh]">
                            {experiences.map((experience, index) => (
                                <div key={experience.id} className="relative border border-gray-300 rounded-lg p-4">
                                    {experiences.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => removeExperience(experience.id)}
                                            className="absolute top-2 right-2 p-2 h-8 w-8 bg-[#970404] hover:bg-[#970404]/80 text-white cursor-pointer"
                                            title="Remove experience"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    )}


                                    <FieldGroup>
                                        <FieldSet>
                                            <div className="flex gap-4">
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor={`company_${experience.id}`}>Company</FieldLabel>
                                                        <Input
                                                            id={`company_${experience.id}`}
                                                            placeholder="Google"
                                                            required
                                                            type="text"
                                                            {...register(`company_${experience.id}`)}
                                                        />
                                                    </Field>
                                                </FieldGroup>

                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor={`position_${experience.id}`}>Position</FieldLabel>
                                                        <Input
                                                            id={`position_${experience.id}`}
                                                            placeholder="Software Engineer"
                                                            required
                                                            type="text"
                                                            {...register(`position_${experience.id}`)}
                                                        />
                                                    </Field>
                                                </FieldGroup>
                                            </div>

                                            <div className="flex gap-4">
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor={`start_date_experience_${experience.id}`}>Start Date</FieldLabel>
                                                        <Input
                                                            id={`start_date_experience_${experience.id}`}
                                                            placeholder="2020"
                                                            required
                                                            type="text"
                                                            {...register(`start_date_experience_${experience.id}`)}
                                                        />
                                                    </Field>
                                                </FieldGroup>

                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor={`end_date_experience_${experience.id}`}>End Date</FieldLabel>
                                                        <Input
                                                            id={`end_date_experience_${experience.id}`}
                                                            placeholder="2025"
                                                            required
                                                            type="text"
                                                            {...register(`end_date_experience_${experience.id}`)}
                                                        />
                                                    </Field>
                                                </FieldGroup>
                                            </div>

                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor={`description_experience_${experience.id}`}>Description</FieldLabel>
                                                    <Textarea
                                                        id={`description_experience_${experience.id}`}
                                                        placeholder="Description"
                                                        required
                                                        {...register(`description_experience_${experience.id}`)}
                                                    />
                                                </Field>
                                            </FieldGroup>
                                        </FieldSet>
                                    </FieldGroup>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={addExperience}
                                    className="flex items-center gap-2 bg-[#5E548E] hover:bg-[#443B6F] text-white cursor-pointer"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                    Add Experience
                                </Button>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </form>
    )
}

export default Form