'use client'

import type { ValuesCV } from './Wrapper'
import { PDFDownloadLink } from "@react-pdf/renderer"
import { CVPdf } from "../CVPdf"
import { useEffect, useState } from "react"
import { Mail, Phone, Linkedin, Github } from "lucide-react"

interface VisorProps {
    values: ValuesCV
}

// Same helpers as used in CVPdf to ensure consistency
const extractProjects = (data: ValuesCV) => {
    const projects: Record<string, any> = {};
    Object.keys(data).forEach(key => {
        const match = key.match(/^(project_name|project_link_url|project_link_label|project_description)_(\d+)$/);
        if (match) {
            const field = match[1];
            const id = match[2];
            if (!projects[id]) projects[id] = {};
            projects[id][field] = data[key];
        }
    });
    return Object.values(projects).filter(proj => proj.project_name || proj.project_description);
};

const extractEducations = (data: ValuesCV) => {
    const educations: Record<string, any> = {};
    Object.keys(data).forEach(key => {
        const match = key.match(/^(university|career|start_date_education|end_date_education)_(\d+)$/);
        if (match) {
            const field = match[1];
            const id = match[2];
            if (!educations[id]) educations[id] = {};
            educations[id][field] = data[key];
        }
    });
    return Object.values(educations).filter(edu => edu.university || edu.career);
};

const extractExperiences = (data: ValuesCV) => {
    const experiences: Record<string, any> = {};
    Object.keys(data).forEach(key => {
        const match = key.match(/^(company|position|start_date_experience|end_date_experience|description_experience)_(\d+)$/);
        if (match) {
            const field = match[1];
            const id = match[2];
            if (!experiences[id]) experiences[id] = {};
            experiences[id][field] = data[key];
        }
    });
    return Object.values(experiences).filter(exp => exp.company || exp.position);
};

const extractSkills = (data: ValuesCV) => {
    const skills: string[] = [];
    Object.keys(data).forEach(key => {
        if (key.startsWith('skill_')) {
            const val = data[key];
            if (val) skills.push(val);
        }
    });
    return skills;
};

const Visor = ({ values }: VisorProps) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const educations = extractEducations(values);
    const experiences = extractExperiences(values);
    const skills = extractSkills(values);
    const projects = extractProjects(values);

    return (
        <div className="w-1/2 h-full flex flex-col items-center gap-4 bg-gray-100 p-4 border rounded overflow-auto">
            {/* Download Button */}
            {isClient && (
                <PDFDownloadLink
                    document={<CVPdf data={values} />}
                    fileName={`CV-${values.fullName || 'cv'}.pdf`}
                    className="bg-[#970404] hover:bg-[#7c0303] text-white font-bold py-2 px-4 rounded shadow transition-colors"
                >
                    {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                </PDFDownloadLink>
            )}

            <p className="text-center text-gray-500 text-xs">* The current viewer displays the height of two A4 sheets, but when downloaded, two separate sheets could be displayed.</p>

            {/* DOM Preview - A4 Size Simulation */}
            <div
                className="bg-white text-black font-serif shadow-2xl box-border mx-auto"
                style={{
                    width: '185mm',
                    minHeight: '530mm',
                    padding: '30pt',
                    fontSize: '11pt',
                    lineHeight: '1.5',

                }}
            >
                {/* Header */}
                <header style={{ marginBottom: '15pt', borderBottom: '1pt solid black', paddingBottom: '10pt', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '24pt', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'Times New Roman' }}>
                        {values.fullName}
                    </h1>
                    <h2 style={{ fontSize: '11pt', fontWeight: 'normal', marginBottom: '5pt', fontFamily: 'Times New Roman', marginTop: '-3pt' }}>
                        {values.professional_role}
                    </h2>

                    <div style={{ fontSize: '9.5pt', display: 'flex', justifyContent: 'center', gap: '15pt', flexWrap: 'wrap', fontFamily: 'Times New Roman', fontWeight: 'normal', borderTop: '1pt solid black', paddingTop: '8pt' }}>
                        {values.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5pt' }}><Mail style={{ width: '12pt', height: '12pt', }} /> {values.email}</span>}
                        {values.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '5pt' }}><Phone style={{ width: '12pt', height: '12pt' }} /> {values.phone}</span>}
                        {values.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '5pt' }}><Linkedin style={{ width: '12pt', height: '12pt' }} /> {`LinkedIn/${values.linkedin.substring(28, values.linkedin.length)}`}</span>}
                        {values.github && <span style={{ display: 'flex', alignItems: 'center', gap: '5pt' }}><Github style={{ width: '12pt', height: '12pt' }} /> {`GitHub/${values.github.substring(19, values.github.length)}`}</span>}
                    </div>

                    {values.descriptionPData && (
                        <section style={{ marginTop: '15pt', borderTop: '1pt solid black', paddingTop: '10pt' }}>
                            <div style={{ textAlign: 'justify', fontSize: '10pt' }}>
                                {values.descriptionPData}
                            </div>
                        </section>
                    )}
                </header>

                {/* Education */}
                {educations.length > 0 && (
                    <section style={{ marginBottom: '15pt' }}>
                        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid black', marginBottom: '10pt', paddingBottom: '2pt', letterSpacing: '1px' }}>
                            Education
                        </h2>
                        {educations.map((edu, index) => (
                            <div key={index} style={{ marginBottom: '8pt' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2pt' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
                                        <span style={{ fontWeight: 'bold' }}>{edu.university}</span>
                                        <span style={{ fontStyle: 'normal' }}>{edu.career}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span>{edu.start_date_education} - {edu.end_date_education}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section style={{ marginBottom: '15pt' }}>
                        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid black', marginBottom: '10pt', paddingBottom: '2pt', letterSpacing: '1px' }}>
                            Technical Skills
                        </h2>
                        <div>
                            {skills.join(', ')}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section style={{ marginBottom: '15pt' }}>
                        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid black', marginBottom: '10pt', paddingBottom: '2pt', letterSpacing: '1px' }}>
                            Experience
                        </h2>
                        {experiences.map((exp, index) => (
                            <div key={index} style={{ marginBottom: '12pt' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2pt' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
                                        <span style={{ fontWeight: 'bold' }}>{exp.company}</span>
                                        <span style={{ fontStyle: 'normal' }}>{exp.position}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span>{exp.start_date_experience} - {exp.end_date_experience}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'justify', fontSize: '10pt' }}>
                                    {exp.description_experience}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section style={{ marginBottom: '15pt' }}>
                        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid black', marginBottom: '10pt', paddingBottom: '2pt', letterSpacing: '1px' }}>
                            Projects
                        </h2>
                        {projects.map((proj, index) => (
                            <div key={index} style={{ marginBottom: '12pt' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5pt', marginBottom: '2pt' }}>
                                    <span style={{ fontWeight: 'bold' }}>{proj.project_name}</span>
                                    {proj.project_link_url && (
                                        <a
                                            href={proj.project_link_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: '0.8em',
                                                border: '1px solid #06b6d4',
                                                padding: '0 4px',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                display: 'inline-block'
                                            }}
                                        >
                                            {proj.project_link_label || 'Link'}
                                        </a>
                                    )}
                                </div>
                                <div style={{ textAlign: 'justify', fontSize: '10pt' }}>
                                    {proj.project_description}
                                </div>
                            </div>
                        ))}
                    </section>
                )}


            </div>
        </div>
    )
}

export default Visor
