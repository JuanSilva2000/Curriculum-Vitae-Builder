import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect, Circle, Link } from '@react-pdf/renderer';
import type { ValuesCV } from './main/Wrapper';

const styles = StyleSheet.create({
    page: {
        padding: '30pt',
        fontFamily: 'Times-Roman',
        fontSize: '11pt',
        lineHeight: 1.5,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: '15pt',
        textAlign: 'center',
        borderBottomWidth: '0.5pt',
        borderBottomColor: '#000000',
        paddingBottom: '8pt',
    },
    name: {
        fontSize: '24pt',
        textTransform: 'uppercase',
        marginBottom: '12pt',
        fontFamily: 'Times-Bold',
        letterSpacing: 0,
    },
    professionalRole: {
        fontSize: '11pt',
        marginBottom: '8pt',
        fontFamily: 'Times-Roman',
        letterSpacing: 0,
    },
    contactInfo: {
        fontSize: '10pt',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '15pt',
        borderTopWidth: '0.5pt',
        borderTopColor: '#000000',
        paddingTop: '9pt',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5pt',
        color: '#000000',
        textDecoration: 'none',
        // height: '12pt',
        // border: '1pt solid #000000',
    },
    contactText: {
        fontSize: '10pt',
        color: '#000000',
        marginTop: '3.5pt', // Ajuste manual para centrar verticalmente con el icono
        textDecoration: 'none',
    },
    icon: {
        width: '12pt',
        height: '12pt',
    },
    descriptionSection: {
        marginTop: '9pt',
        borderTopWidth: '0.5pt',
        borderTopColor: '#000000',
        paddingTop: '7pt',
    },
    descriptionText: {
        fontSize: '10pt',
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    section: {
        marginBottom: '15pt',
    },
    sectionTitle: {
        fontSize: '12pt',
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        borderBottomWidth: '0.5pt',
        borderBottomColor: '#000000',
        marginBottom: '10pt',
        paddingBottom: '2pt',
        letterSpacing: '1px',
    },
    educationItem: {
        marginBottom: '8pt',
    },
    experienceItem: {
        marginBottom: '12pt',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '2pt',
    },
    leftCol: {
        flexDirection: 'column',
        maxWidth: '70%',
    },
    rightCol: {
        textAlign: 'right',
        width: '30%',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    normal: {
        fontFamily: 'Times-Roman',
    },
    expDescription: {
        fontSize: '10pt',
        textAlign: 'justify',
        marginTop: '1pt',
        lineHeight: 1.5,
    },
    skillsText: {
        fontSize: '11pt',
        lineHeight: 1.5,
    },
});

interface CVPdfProps {
    data: ValuesCV;
}

// Helpers
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
    return Object.values(educations);
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
    return Object.values(experiences);
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

// Icons (SVG simples y limpios)
interface IconProps {
    style?: any;
}

const IconMail = ({ style }: IconProps) => (
    <Svg viewBox="0 0 24 24" style={style || styles.icon}>
        <Rect x="3" y="5" width="18" height="14" rx="2" stroke="black" strokeWidth="1.5" fill="none" />
        <Path d="M3 7l9 6 9-6" stroke="black" strokeWidth="1.5" fill="none" />
    </Svg>
);

const IconPhone = ({ style }: IconProps) => (
    <Svg viewBox="0 0 24 24" style={style || styles.icon}>
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="black" strokeWidth="1.5" fill="none" />
    </Svg>
);

const IconLinkedin = ({ style }: IconProps) => (
    <Svg viewBox="0 0 24 24" style={style || styles.icon}>
        <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="black" strokeWidth="1.5" fill="none" />
        <Rect x="2" y="9" width="4" height="12" stroke="black" strokeWidth="1.5" fill="none" />
        <Circle cx="4" cy="4" r="2" fill="black" />
    </Svg>
);

const IconGithub = ({ style }: IconProps) => (
    <Svg viewBox="0 0 24 24" style={style || styles.icon}>
        <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="black" strokeWidth="1.5" fill="none" />
    </Svg>
);

export const CVPdf = ({ data }: CVPdfProps) => {
    const educations = extractEducations(data);
    const experiences = extractExperiences(data);
    const skills = extractSkills(data);

    // Helper para acortar URLs (igual que en Visor)
    const formatLinkedin = (url: string) => {
        if (url.length > 28) {
            return `LinkedIn/${url.substring(28)}`;
        }
        return url;
    };

    const formatGithub = (url: string) => {
        if (url.length > 19) {
            return `GitHub/${url.substring(19)}`;
        }
        return url;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.fullName || ''}</Text>
                    <Text style={styles.professionalRole}>{data.professional_role || ''}</Text>
                    <View style={styles.contactInfo}>
                        {data.email && (
                            <View style={styles.contactItem}>
                                <IconMail />
                                <Text style={styles.contactText}>{data.email}</Text>
                            </View>
                        )}
                        {data.phone && (
                            <View style={styles.contactItem}>
                                <IconPhone />
                                <Text style={styles.contactText}>{data.phone}</Text>
                            </View>
                        )}
                        {data.linkedin && (
                            <Link src={data.linkedin} style={styles.contactItem}>
                                <IconLinkedin />
                                <Text style={styles.contactText}>{formatLinkedin(data.linkedin)}</Text>
                            </Link>
                        )}
                        {data.github && (
                            <Link src={data.github} style={styles.contactItem}>
                                <IconGithub />
                                <Text style={styles.contactText}>{formatGithub(data.github)}</Text>
                            </Link>
                        )}
                    </View>

                    {/* Profile Description dentro del Header */}
                    {data.descriptionPData && (
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionText}>{data.descriptionPData}</Text>
                        </View>
                    )}
                </View>

                {/* Education */}
                {educations.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {educations.map((edu, index) => (
                            <View key={index} style={styles.educationItem}>
                                <View style={styles.row}>
                                    <View style={styles.leftCol}>
                                        <Text style={styles.bold}>{edu.university || ''}</Text>
                                        <Text style={styles.normal}>{edu.career || ''}</Text>
                                    </View>
                                    <View style={styles.rightCol}>
                                        <Text>{edu.start_date_education || ''} - {edu.end_date_education || ''}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        <Text style={styles.skillsText}>{skills.join(', ')}</Text>
                    </View>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experiences.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.row}>
                                    <View style={styles.leftCol}>
                                        <Text style={styles.bold}>{exp.company || ''}</Text>
                                        <Text style={styles.normal}>{exp.position || ''}</Text>
                                    </View>
                                    <View style={styles.rightCol}>
                                        <Text>{exp.start_date_experience || ''} - {exp.end_date_experience || ''}</Text>
                                    </View>
                                </View>
                                {exp.description_experience && (
                                    <Text style={styles.expDescription}>{exp.description_experience}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

            </Page>
        </Document>
    );
};
