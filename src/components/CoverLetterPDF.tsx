

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register a standard font (optional, using default Helvetica for now which is safe)
const styles = StyleSheet.create({
    page: {
        padding: 50, // 1 inch margins approx
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#333333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000000',
    },
    date: {
        fontSize: 11,
        marginBottom: 20,
        textAlign: 'right',
        color: '#666666',
    },
    content: {
        marginTop: 10,
    },
    paragraph: {
        marginBottom: 12,
        textAlign: 'justify',
    },

});

interface CoverLetterPDFProps {
    content: string;
}

// Simple helper to strip markdown (bold/italic) for PDF text
const cleanText = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/\*(.*?)\*/g, '$1')     // Italic
        .replace(/\[(.*?)\]/g, '$1');    // Brackets (placeholders)
};

export const CoverLetterPDF: React.FC<CoverLetterPDFProps> = ({ content }) => {
    // Split by double newlines for paragraphs
    const paragraphs = content ? content.split('\n\n') : [];
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header - could be dynamic if we had user profile passed in */}
                <View style={styles.header}>
                    <Text style={styles.title}>Cover Letter</Text>
                </View>

                <Text style={styles.date}>{currentDate}</Text>

                <View style={styles.content}>
                    {paragraphs.map((para, index) => (
                        <Text key={index} style={styles.paragraph}>
                            {cleanText(para.trim())}
                        </Text>
                    ))}
                </View>


            </Page>
        </Document>
    );
};

export default CoverLetterPDF;
