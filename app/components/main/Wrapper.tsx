import Form from './Form'
import Visor from './Visor'
import { useState, useCallback } from 'react'

export type ValuesCV = {
    [key: string]: string | undefined
    fullName?: string
    profesional_role?: string
    email?: string
    phone?: string
    linkedin?: string
    github?: string
    descriptionPData?: string
}

const Wrapper = () => {
    const [valuesCV, setValuesCV] = useState<ValuesCV>({
        career_1: "",
        company_1: "",
        descriptionPData: "",
        description_experience_1: "",
        email: "",
        end_date_education_1: "",
        end_date_experience_1: "",
        fullName: "",
        github: "",
        linkedin: "",
        phone: "",
        position_1: "",
        skill_1: "",
        start_date_education_1: "",
        start_date_experience_1: "",
        university_1: "",
    })

    const handleValuesChange = useCallback((values: ValuesCV) => {
        setValuesCV(values)
    }, [])

    return (
        <main className="flex flex-col md:flex-row justify-center items-center h-[95vh] gap-4" >
            <Form onValuesChange={handleValuesChange} />
            <Visor values={valuesCV} />
        </main>
    )
}

export default Wrapper
