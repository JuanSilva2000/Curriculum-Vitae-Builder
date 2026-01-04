import { Document, Page, Text, View, StyleSheet, Svg, Path, Circle, Polyline, Line, Rect } from '@react-pdf/renderer';
import type { ValuesCV } from './main/Wrapper';

const styles = StyleSheet.create({
    page: {
        padding: 30, // Changed from 40 to match Visor
        fontFamily: 'Times-Roman',
        fontSize: 11,
        lineHeight: 1.5,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 15, // Changed from 20
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        textTransform: 'uppercase',
        marginBottom: 5,
        fontFamily: 'Times-Bold',
    },
    contactInfo: {
        fontSize: 9.5, // Changed from 10
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    contactItem: {
        marginHorizontal: 7.5, // Roughly half of 15pt gap
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 12, // 12pt
        height: 12,
        marginRight: 5, // 5pt gap
    },
    descriptionSection: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#000000',
        paddingTop: 10,
    },
    descriptionText: {
        fontSize: 10,
        textAlign: 'justify',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 10,
        paddingBottom: 2,
        letterSpacing: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    leftCol: {
        flexDirection: 'column',
        maxWidth: '70%',
    },
    rightCol: {
        width: '30%',
        textAlign: 'right',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    // Removed italic class usage for career/position
    italic: {
        fontFamily: 'Times-Italic',
    },
    expDescription: {
        fontSize: 10,
        textAlign: 'justify',
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

// Icons (Approximations using SVG paths)
const IconMail = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Rect x="2" y="4" width="20" height="16" rx="2" stroke="black" strokeWidth="2" fill="none" />
        <Path d="M22 6l-10 7L2 6" stroke="black" strokeWidth="2" fill="none" />
    </Svg>
);

const IconPhone = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="black" strokeWidth="2" fill="none" />
    </Svg>
);

const IconLinkedin = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="black" strokeWidth="2" fill="none" />
        <Rect x="2" y="9" width="4" height="12" stroke="black" strokeWidth="2" fill="none" />
        <Circle cx="4" cy="4" r="2" fill="black" />
    </Svg>
);

const IconGithub = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="black" strokeWidth="2" fill="none" />
    </Svg>
);


export const CVPdf = ({ data }: CVPdfProps) => {
    const educations = extractEducations(data);
    const experiences = extractExperiences(data);
    const skills = extractSkills(data);

    // Helper to shorten URLs matches Visor logic
    const formatLinkedin = (url: string) => `LinkedIn/${url.substring(28)}`;
    const formatGithub = (url: string) => `GitHub/${url.substring(19)}`;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.fullName}</Text>
                    <View style={styles.contactInfo}>
                        {data.email && (
                            <View style={styles.contactItem}>
                                <IconMail />
                                <Text>{data.email}</Text>
                            </View>
                        )}
                        {data.phone && (
                            <View style={styles.contactItem}>
                                <IconPhone />
                                <Text>{data.phone}</Text>
                            </View>
                        )}
                        {data.linkedin && (
                            <View style={styles.contactItem}>
                                <IconLinkedin />
                                <Text>{data.linkedin.length > 28 ? formatLinkedin(data.linkedin) : data.linkedin}</Text>
                            </View>
                        )}
                        {data.github && (
                            <View style={styles.contactItem}>
                                <IconGithub />
                                <Text>{data.github.length > 19 ? formatGithub(data.github) : data.github}</Text>
                            </View>
                        )}
                    </View>

                    {/* Profile Summary moved to Header */}
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
                            <View key={index} style={{ marginBottom: 8 }}>
                                <View style={styles.row}>
                                    <View style={styles.leftCol}>
                                        <Text style={styles.bold}>{edu.university}</Text>
                                        <Text>{edu.career}</Text>
                                    </View>
                                    <View style={styles.rightCol}>
                                        <Text>{edu.start_date_education} - {edu.end_date_education}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experiences.map((exp, index) => (
                            <View key={index} style={{ marginBottom: 12 }}>
                                <View style={styles.row}>
                                    <View style={styles.leftCol}>
                                        <Text style={styles.bold}>{exp.company}</Text>
                                        <Text>{exp.position}</Text>
                                    </View>
                                    <View style={styles.rightCol}>
                                        <Text>{exp.start_date_experience} - {exp.end_date_experience}</Text>
                                    </View>
                                </View>
                                {exp.description_experience && (
                                    <View>
                                        <Text style={styles.expDescription}>{exp.description_experience}</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        <View>
                            <Text>{skills.join(', ')}</Text>
                        </View>
                    </View>
                )}

            </Page>
        </Document>
    );
};
